using CarFleet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Data.BaseRepository
{
    public interface ICarRepository : IEntityBaseRepository<Car>
    {
        IEnumerable<Car> FindAvailableCars(DateTime startDate, DateTime endDate);
    }
}
