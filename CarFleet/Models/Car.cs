using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string brand { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string model { get; set; }
        public bool isAvailable { get; set; }

    }
}
