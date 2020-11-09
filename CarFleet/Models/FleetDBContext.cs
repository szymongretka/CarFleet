using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Models
{
    public class FleetDBContext : DbContext
    {
        public FleetDBContext(DbContextOptions<FleetDBContext> options) : base(options)
        {

        }

        public DbSet<Car> Cars { get; set; }
    }
}
