using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Data.Repository
{
    public class CarRepository : EntityBaseRepository<Car>, ICarRepository
    {
        FleetDBContext _context;
        public CarRepository(FleetDBContext context) : base(context) 
        {
            _context = context;
        }

        public IEnumerable<Car> FindAvailableCars(DateTime startDate, DateTime endDate)
        {
            List<Car> availableCars = new List<Car>();

            foreach (Car car in _context.Cars.Include(c => c.Reservations).ToList())
            {

                if (car.Reservations == null || car.Reservations.Count() == 0 || !car.Reservations.Any(res => 
                        (startDate < res.startDate && endDate > res.startDate) || 
                        (startDate < res.endDate && endDate > res.endDate) || 
                        (startDate > res.startDate && endDate < res.endDate) ||
                        (startDate < res.startDate && endDate > res.endDate)
                    )) 
                {
                    availableCars.Add(car);
                }
            }

            return availableCars;
        }
    }
}
