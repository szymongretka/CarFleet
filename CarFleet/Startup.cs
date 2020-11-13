using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarFleet.Data.BaseRepository;
using CarFleet.Data.Repository;
using Microsoft.Extensions.DependencyInjection;
using CarFleet.Models;
using CarFleet.Services;
using CarFleet.Services.Abstract;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Hangfire;
using Hangfire.Common;

namespace CarFleet
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
             );

            services.AddDbContext<FleetDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            services.AddHangfire(config =>
               config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
               .UseSimpleAssemblyNameTypeSerializer()
               .UseDefaultTypeSerializer()
               .UseSqlServerStorage(Configuration.GetConnectionString("DevConnection")));

            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration.GetValue<string>("JWTSecretKey"))
                        )
                    };
                });

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICarRepository, CarRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();

            services.AddSingleton<IAuthService>(
                new AuthService(
                    Configuration.GetValue<string>("JWTSecretKey"),
                    Configuration.GetValue<int>("JWTLifespan")
                )
            );

            services.AddScoped<IMailService, MailService>();
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IBackgroundJobClient backgroundJobClient, IRecurringJobManager recurringJobManager, IServiceProvider serviceProvider)
        {
            app.UseCors(options => options.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseHangfireDashboard();
            app.UseHangfireServer();

            var context = serviceProvider.GetService<FleetDBContext>();

            recurringJobManager.AddOrUpdate("Sending email", () => new MailService(context).sendMail(), "5 * * * *"); //"0 6 * * *" every day at 6am

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
