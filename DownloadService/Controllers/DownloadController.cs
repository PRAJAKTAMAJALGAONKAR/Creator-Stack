using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

namespace DownloadService.Controllers;

[ApiController]
[Route("api/download")]
public class DownloadController : ControllerBase
{
    private readonly IAmazonS3 _s3;
    private readonly IHttpClientFactory _httpFactory;

    public DownloadController(IAmazonS3 s3, IHttpClientFactory httpFactory)
    {
        _s3 = s3;
        _httpFactory = httpFactory;
    }

    // GET download status/metadata
    [HttpGet("status")]
    public async Task<IActionResult> GetDownloadStatus([FromQuery] string session_id)
    {
        if (string.IsNullOrEmpty(session_id))
            return BadRequest(new { error = "Missing session_id" });

        var http = _httpFactory.CreateClient();

        try
        {
            var response = await http.GetAsync($"http://172.21.176.1:7777/api/payment/verify?sessionId={session_id}");

            if (!response.IsSuccessStatusCode)
                return Unauthorized(new { error = "Payment verification failed" });

            var data = await response.Content
                .ReadFromJsonAsync<Dictionary<string, string>>();

            if (data == null ||
                !data.ContainsKey("bucket") ||
                !data.ContainsKey("objectKey") ||
                !data.ContainsKey("fileName") ||
                !data.ContainsKey("mimeType"))
            {
                return BadRequest(new { error = "Invalid verification response" });
            }

            return Ok(new
            {
                fileName = data["fileName"],
                mimeType = data["mimeType"],
                verified = true
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Verification failed", message = ex.Message });
        }
    }

    // GET actual file download
    [HttpGet("file")]
    public async Task<IActionResult> DownloadFile([FromQuery] string session_id)
    {
        if (string.IsNullOrEmpty(session_id))
            return BadRequest(new { error = "Missing session_id" });

        var http = _httpFactory.CreateClient();

        try
        {
          var response = await http.GetAsync($"http://172.21.176.1:7777/api/payment/verify?sessionId={session_id}");


            if (!response.IsSuccessStatusCode)
                return Unauthorized(new { error = "Payment verification failed" });

            var data = await response.Content
                .ReadFromJsonAsync<Dictionary<string, string>>();

            if (data == null ||
                !data.ContainsKey("bucket") ||
                !data.ContainsKey("objectKey") ||
                !data.ContainsKey("fileName") ||
                !data.ContainsKey("mimeType"))
            {
                return BadRequest(new { error = "Invalid verification response" });
            }

            var s3Object = await _s3.GetObjectAsync(
                data["bucket"],
                data["objectKey"]
            );

            return File(
                s3Object.ResponseStream,
                data["mimeType"],
                data["fileName"]
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Download failed", message = ex.Message });
        }
    }
}
