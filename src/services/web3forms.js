export async function submitToWeb3Forms(record) {
    try {
        const response = await fetch("/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(record),
        });

        let result = null;
        try {
            result = await response.json();
        } catch (e) {
            // Ignore JSON parse errors if the response is plain text (like a Vite proxy error)
        }

        if (response.ok && result && result.success) {
            return result.data; // Return the backend data instead of just 'true'
        }
        
        console.error("Backend error:", result);
        // Throw a specific error if it's a 400 Bad Request
        if (result && result.errors) {
            throw new Error("Validation Error: " + JSON.stringify(result.errors));
        }
        throw new Error(`Server Error (Status ${response.status}). Is Django running?`);
    } catch (err) {
        console.error("API submission failed:", err);
        // If it's our custom error, rethrow it so it shows up in the UI
        if (err.message.includes("Validation Error") || err.message.includes("Server Error")) {
            throw err;
        }
        throw new Error("Could not connect to the backend server. Is Django running?");
    }
}
