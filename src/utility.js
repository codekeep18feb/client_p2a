

export async function fetchAppData(app_name, api_key) {
    console.log("was it called??")
    if (!app_name || !api_key) {
      console.error("app_name not provided to the client!");
      return;
    }
  
    console.log("arerewrewrew");
    const reqUrl = `https://gbzm6cqi21.execute-api.ap-south-1.amazonaws.com/prod/get_app?act_type=user&app_name=${app_name}`;
    const headersList = {
      Accept: "*/*",
      "X-API-Key": api_key, //THIS ONE SHOULD BE PICKED FROM index.html
    };
  
    try {
      const response = await fetch(reqUrl, {
        method: "GET",
        headers: headersList,
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log("APP DATA", data);
      localStorage.setItem("tezkit_app_data", JSON.stringify(data));
  
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  
  