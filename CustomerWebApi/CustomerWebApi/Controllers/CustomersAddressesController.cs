using CustomerWebApi.Models;
using CustomerWebApi.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace CustomerWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersAddressesController : ControllerBase
    {
        private readonly IRepository<CustomerAddress> _customerAddressRepository;
        private readonly ILogger<CustomersController> _logger;

        public CustomersAddressesController(IRepository<CustomerAddress> addressRepository,
                                            ILogger<CustomersController> logger)
        {
            _customerAddressRepository = addressRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerAddress>>> GetAddresses()
        {
            try
            {
                return Ok(await _customerAddressRepository.GetAllAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Get Addresses, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
          
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerAddress>> GetAddress(int id)
        {
            try
            {
                var address = await _customerAddressRepository.GetByIdAsync(id);
                if (address == null)
                {
                    return NotFound();
                }
                return Ok(address);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Get Address, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPost]
        public async Task<ActionResult<CustomerAddress>> PostAddress(CustomerAddress address)
        {
           
            try
            {
                await _customerAddressRepository.AddAsync(address);

                var savedAddress = await _customerAddressRepository.GetByIdAsync(address.CustomerAddressId);
                if (savedAddress == null)
                {
                    return NotFound();
                }
                return Ok(savedAddress);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Post Address, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(int id, CustomerAddress address)
        {
         
            try
            {
                if (id != address.CustomerAddressId)
                {
                    return BadRequest();
                }

                await _customerAddressRepository.UpdateAsync(address);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Put Address, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
           
            try
            {
                await _customerAddressRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Delete Address, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }

}
