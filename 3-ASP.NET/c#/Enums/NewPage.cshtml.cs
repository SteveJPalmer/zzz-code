using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using razorPages.enums;

namespace razorPages.Pages
{
    public class NewPageModel : PageModel
    {
        public string Name => (string)TempData[nameof(Name)];
    
        public void OnGet()
        {
            Console.WriteLine(">>> NewPageModel > onGet()");
            
            /***********************
             * Accessing Enum names
             ***********************/
            int findInx = 1;
            string findName = "OnHold";
            
            // via Numeric
            DocStatus myEnum1a = (DocStatus)1;                                       // Analysed - emun value from integer
            DocStatus myEnum1b = (DocStatus)findInx;                                 // Analysed - emun value from integer (variable)
            var myEnum1c = (DocStatus)1;                                             // Analysed - & var type
            
            // via string containing Name or Numeric  - Dynamic 
            // Parse(Type, String)
            DocStatus myEnum2a = (DocStatus)Enum.Parse(typeof(DocStatus), "OnHold");  // OnHold - emun value from Name
            DocStatus myEnum2b = (DocStatus)Enum.Parse(typeof(DocStatus), findName);       // OnHold - emun value from Name (variable)
            var myEnum2c = Enum.Parse(typeof(DocStatus), "OnHold");              // OnHold - & var type
            var myEnum2d = Enum.Parse(typeof(DocStatus), "2");                   // OnHold - also for numeric   
            
            // Parse<TEnum>(String)
            var myEnum2e = Enum.Parse<DocStatus>("OnHold");                                // OnHold - new concise version
            var myEnum2f = Enum.Parse<DocStatus>(findName);                                // OnHold - new concise version (variable)
            var myEnum2g = Enum.Parse<DocStatus>("2");                                     // OnHold - also for numeric
            
            Console.WriteLine(">>> enum1: {0}", myEnum1a);
            Console.WriteLine(">>> enum2: {0}", myEnum2a);
            
            /************************
            * Accessing Enum numeric
            *************************/
            // get the underlying integer
            Console.WriteLine(">>> " + (int)DocStatus.OnHold);		                       // 2    - explicit cast required
            
            /************************
            * Iterating
            *************************/
            var statuses = Enum.GetValues(typeof(DocStatus));
            //var statuses = Enum.GetValues<DocStatus>();               // alternative
            foreach (var item in statuses)
            {
                Console.WriteLine($">>> {item}");                       // outputs value
            }
        }

    }
}
