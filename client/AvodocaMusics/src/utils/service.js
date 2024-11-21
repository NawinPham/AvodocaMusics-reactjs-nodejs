export const baseUrl = "http://localhost:8082/api";

export const postRequest = async (url, body, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occured...";

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      let message = "An error occured...";

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, message };
    }

    return data;

  } catch (error) {
    return { error: true, message: error.message || "Network error occurred" };
  }

};
