using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using CarFleet.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CarFleet.Services
{
    public class MailService: IMailService
    {
        FleetDBContext _context;

        public MailService(FleetDBContext context)
        {
            _context = context;
        }
        public void sendMail()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");
            var config = builder.Build();

            var reservations = _context.Reservations.Include(r => r.Car).Where(r => r.endDate <= DateTime.Now.AddDays(1)).Select(r => new { UserEmail = r.userEmail, Brand = r.Car.brand });

            try
            {
                SmtpClient SmtpServer = new SmtpClient(config["Smtp:Host"]);
                SmtpServer.Port = int.Parse(config["Smtp:Port"]);
                SmtpServer.Credentials = new NetworkCredential(config["Smtp:Username"], config["Smtp:Password"]);
                SmtpServer.EnableSsl = true;

                foreach (var obj in reservations)
                {
                    if (obj.UserEmail != null) {
                        Console.WriteLine("useremail: {0} car brand: {1} ", obj.UserEmail, obj.Brand);
                        MailMessage mail = new MailMessage();
                        mail.Subject = "Your reservation is about to end";
                        mail.From = new MailAddress("test.fissst@gmail.com");
                        mail.To.Add(obj.UserEmail);
                        mail.Body = "Your reservation for car: " + obj.Brand + " is ending";
                        SmtpServer.Send(mail);
                    }
                   
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
