using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarFleet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        FleetDBContext _context;
        IReservationRepository reservationRepository;
        IUserRepository userRepository;
        public ReservationController(FleetDBContext context, IReservationRepository reservationRepository, IUserRepository userRepository)
        {
            _context = context;
            this.reservationRepository = reservationRepository;
            this.userRepository = userRepository;
        }

        // GET: api/car
        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IEnumerable<Reservation> GetAllReservations()
        {
            int userId = GetUserId();

            if (userRepository.isUserAdmin(userId))
            {
                return reservationRepository.GetAll();
            }
            else {
                return reservationRepository.FindBy(res => res.userEmail.Equals(GetUserEmail(userId)));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Reservation>> DeleteReservation(int Id)
        {
            var reservation = await _context.Reservations.FindAsync(Id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return reservation;
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
