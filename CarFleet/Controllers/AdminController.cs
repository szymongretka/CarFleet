using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using CarFleet.Services.Abstract;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CarFleet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IUserRepository userRepository;

        private readonly FleetDBContext _context;

        public AdminController(FleetDBContext context, IUserRepository userRepository)
        {
            _context = context;
            this.userRepository = userRepository;
        }

        [HttpGet("users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (!userRepository.isUserAdmin(GetUserId())) 
            {
                return BadRequest(new { isAdmin = "User does not have Admin priviledges!" });
            }
            
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (!userRepository.isUserAdmin(GetUserId()))
            {
                return BadRequest(new { isAdmin = "User does not have Admin priviledges!" });
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutUser(int Id, User user)
        {
            if (!userRepository.isUserAdmin(GetUserId()))
            {
                return BadRequest(new { isAdmin = "User does not have Admin priviledges!" });
            }

            user.Id = Id;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(Id))
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

        [HttpPost("user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (!userRepository.isUserAdmin(GetUserId()))
            {
                return BadRequest(new { isAdmin = "User does not have Admin priviledges!" });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> DeleteUser(int Id)
        {
            if (!userRepository.isUserAdmin(GetUserId()))
            {
                return BadRequest(new { isAdmin = "User does not have Admin priviledges!" });
            }

            var user = await _context.Users.FindAsync(Id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int Id)
        {
            return _context.Users.Any(c => c.Id == Id);
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

    }
}
