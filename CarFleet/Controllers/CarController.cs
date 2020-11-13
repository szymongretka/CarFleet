using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarFleet.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly FleetDBContext _context;
        ICarRepository carRepository;
        IReservationRepository reservationRepository;
        IUserRepository userRepository;

        public CarController(FleetDBContext context, ICarRepository carRepository, IReservationRepository reservationRepository, IUserRepository userRepository)
        {
            _context = context;
            this.carRepository = carRepository;
            this.reservationRepository = reservationRepository;
            this.userRepository = userRepository;
        }

        // GET: api/car
        [HttpGet("/cars")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.Include(c => c.Reservations).ToListAsync();
        }

        // GET: api/car/5
        [HttpGet("car/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public Car GetCar(int id)
        {
            Car car = _context.Cars
                .Where(p => p.Id == id)
                .Include(p => p.Reservations)
                .SingleOrDefault();


            /*if (car == null)
            {
                return NotFound();
            }*/

            return car;
        }

        [HttpGet("availableCars")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public List<Car> GetAvailableCars(string startDate, string endDate)
        {
            return (List<Car>)carRepository.FindAvailableCars(DateTime.Parse(startDate), DateTime.Parse(endDate));
        }

        [HttpPut("car/{id}/book")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public void BookCar(int Id, string startDate, string endDate)
        {
            Car Car = _context.Cars
                .Where(p => p.Id == Id)
                .Include(p => p.Reservations)
                .SingleOrDefault();

            var reservation = new Reservation
            {
                startDate = DateTime.Parse(startDate),
                endDate = DateTime.Parse(endDate),
                Car = Car,
                userEmail = GetUserEmail(GetUserId())
            };
            Car.Reservations.Add(reservation);
            _context.Reservations.Update(reservation);
            _context.SaveChanges();

            
        }


        [HttpPut("car/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutCar(int Id, Car car)
        {
            car.Id = Id;

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("/car")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            //test

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }

        // DELETE: /car/5
        [HttpDelete("car/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Car>> DeleteCar(int Id)
        {
            var car = await _context.Cars.FindAsync(Id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return car;
        }

        private bool CarExists(int Id)
        {
            return _context.Cars.Any(c => c.Id == Id);
        }
        private int GetUserId()
        {
            string header = Request.Headers["Authorization"];
            var jwt = header.Substring(7);
            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwt).Claims.ToList();
            var userId = claims?.FirstOrDefault(x => x.Type.Equals("unique_name", StringComparison.OrdinalIgnoreCase))?.Value;
            return int.Parse(userId);
        }
        private string GetUserEmail(int Id)
        {
            User user = userRepository.GetSingle(Id);
            return user.Email;
        }
    }
}
