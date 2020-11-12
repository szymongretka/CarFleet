using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Data.Repository
{
    public class ReservationRepository : EntityBaseRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(FleetDBContext context) : base(context) { }
    }
}
