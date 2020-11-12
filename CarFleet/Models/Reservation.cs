using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Models
{
    public class Reservation : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public string userEmail { get; set; }

    }
}
