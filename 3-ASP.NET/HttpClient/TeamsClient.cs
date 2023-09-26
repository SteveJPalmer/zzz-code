using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Clarity.Common;
using Clarity.Common.ProblemDetails;
using Clarity.Common.Settings;
using Clarity.Web.Ui.AuthorizationPolicies;
using Clarity.Web.Ui.Dtos.Management;
using Clarity.Web.Ui.Extensions;
using Clarity.Web.Ui.Interfaces.Management;
using Clarity.Web.Ui.Requests.Management;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Clarity.Web.Ui.HttpClients.Management
{
    [Authorize(Policy = PolicyManager.Management.ReadPolicy.NAME)]
    public class TeamsClient : ITeamsClient
    {
        #region Member Variables & Constants
        private readonly HttpClient _httpClient;
        #endregion

        #region Constructor
        public TeamsClient(HttpClient httpClient, IConfiguration configuration)
        {
            httpClient.BaseAddress = new Uri($"{configuration[Constants.ConfigurationKeys.CLIENTS_API]}/api/v1.0/Teams");
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            httpClient.DefaultRequestHeaders.Add("User-Agent", "UsersClient");

            _httpClient = httpClient;
        }
        #endregion

        public async Task<PagedResult<TeamDto>> GetTeams(string token, string searchTerm, int? pageNumber, int? pageSize)
        {
            _httpClient.SetBearerToken(token);

            var builder = new UriBuilder(_httpClient.BaseAddress);
            var query = HttpUtility.ParseQueryString(builder.Query);

            if (pageNumber.HasValue)
            {
                query["pageNumber"] = pageNumber.Value.ToString();
            }

            if (pageSize.HasValue)
            {
                query["pageSize"] = pageSize.Value.ToString();
            }

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query["searchTerm"] = searchTerm;
            }

            builder.Query = query.ToString();
            var requestUri = builder.ToString();

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, requestUri);
            httpRequestMessage.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));

            var httpResponseMessage = await _httpClient.SendAsync(httpRequestMessage);

            var data = await httpResponseMessage.Content.ReadAsStringAsync();

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                // If an error occurs, all our APIs should return a ClarityProblemDetails (ProblemDetails) object
                var problemDetails = ClarityProblemDetails.FromJson(data);
                problemDetails.ThrowException();
            }

            var pagedResult = JsonConvert.DeserializeObject<PagedResult<TeamDto>>(data);
            return pagedResult;
        }

        public async Task<TeamDto> GetTeam(string token, string id)
        {
            _httpClient.SetBearerToken(token);

            var requestUri = $"{_httpClient.BaseAddress}/{id}";

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, requestUri);
            httpRequestMessage.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));

            var httpResponseMessage = await _httpClient.SendAsync(httpRequestMessage);

            var data = await httpResponseMessage.Content.ReadAsStringAsync();

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                // If an error occurs, all our APIs should return a ClarityProblemDetails (ProblemDetails) object
                var problemDetails = ClarityProblemDetails.FromJson(data);
                problemDetails.ThrowException();
            }

            var dto = JsonConvert.DeserializeObject<TeamDto>(data);
            return dto;
        }

        

        [Authorize(Policy = PolicyManager.Management.AdministratorPolicy.NAME)]
        public async Task<TeamDto> PostTeam(string token, AddTeamRequest request)
        {
            _httpClient.SetBearerToken(token);

            var requestUri = _httpClient.BaseAddress.ToString();
            var json = JsonConvert.SerializeObject(request);

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await _httpClient.SendAsync(httpRequestMessage);
            var data = await httpResponseMessage.Content.ReadAsStringAsync();
            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                // If an error occurs, all our APIs should return a ClarityProblemDetails (ProblemDetails) object
               
                var problemDetails = ClarityProblemDetails.FromJson(data);
                problemDetails.ThrowException();
            }
            var dto = JsonConvert.DeserializeObject<TeamDto>(data);
            return dto;
        }

        [Authorize(Policy = PolicyManager.Management.AdministratorPolicy.NAME)]
        public async Task<TeamDto> PutTeam(string token, string id, ModifyTeamRequest request)
        {
            _httpClient.SetBearerToken(token);

            var requestUri = $"{_httpClient.BaseAddress}/{id}";
            var json = JsonConvert.SerializeObject(request);

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, requestUri)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };

            httpRequestMessage.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
            
            var httpResponseMessage = await _httpClient.SendAsync(httpRequestMessage);

            var data = await httpResponseMessage.Content.ReadAsStringAsync();

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                // If an error occurs, all our APIs should return a ClarityProblemDetails (ProblemDetails) object
                var problemDetails = ClarityProblemDetails.FromJson(data);
                problemDetails.ThrowException();
            }

            var dto = JsonConvert.DeserializeObject<TeamDto>(data);
            return dto;
        }

        [Authorize(Policy = PolicyManager.Management.AdministratorPolicy.NAME)]
        public async Task DeleteTeam(string token, string id, RemoveTeamRequest request)
        {
            _httpClient.SetBearerToken(token);

            var requestUri = $"{_httpClient.BaseAddress}/{id}";

            var json = JsonConvert.SerializeObject(request);

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Delete, requestUri)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await _httpClient.SendAsync(httpRequestMessage);
            
            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                // If an error occurs, all our APIs should return a ClarityProblemDetails (ProblemDetails) object
                var data = await httpResponseMessage.Content.ReadAsStringAsync();
                var problemDetails = ClarityProblemDetails.FromJson(data);
                problemDetails.ThrowException();
            }
        }
    }
}