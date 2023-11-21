const baseUrl = "https://online-voting-system-blush.vercel.app/";

const getRequest = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`GET request failed: ${response.status} - ${errorMessage}`);
  }

  return response.json();
};

const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors", // Explicitly set CORS mode
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`POST request failed: ${response.status} - ${errorMessage}`);
  }

  return response.json();
};

export { baseUrl, getRequest, postRequest };
