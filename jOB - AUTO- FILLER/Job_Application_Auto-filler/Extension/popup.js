document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("autofill").addEventListener("click", async () => {
    try {
      // Send message to background script to fetch data
      chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Runtime error:", chrome.runtime.lastError.message);
          return;
        }

        if (!response || response.error) {
          console.error(
            "Error fetching data:",
            response?.error || "No response received"
          );
          return;
        }

        console.log("Fetched Data:", response.data);

        // Ensure there is an active tab before sending message
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Error querying tabs:",
              chrome.runtime.lastError.message
            );
            return;
          }

          if (!tabs || tabs.length === 0) {
            console.error("No active tab found.");
            return;
          }

          // Send autofill message to content script
          chrome.tabs.sendMessage(
            tabs[0].id,
            { message: "autofill", userData: response.data },
            (contentResponse) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message to content script:",
                  chrome.runtime.lastError.message
                );
                return;
              }

              if (!contentResponse || contentResponse.status !== "success") {
                console.error("Failed to trigger autofill");
              } else {
                console.log("Autofill triggered successfully!");
              }
            }
          );
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
