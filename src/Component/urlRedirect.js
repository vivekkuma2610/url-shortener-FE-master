import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UrlRedirect() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      const response = await fetch(
        `https://url-shortener-xndv.onrender.com/shortURL/data`
      );
      const urlData = await response.json();
      if (urlData.success === true) {
        const filterData = urlData.data.find((data) => {
          return data.shortUrl == shortUrl;
        });
        if (filterData) {
          window.location.replace(filterData.longUrl);
          const response2 = await fetch(
            `https://url-shortener-xndv.onrender.com/shortURL/update/clickcount/${shortUrl}`,
            {
              method: "PUT",
              body: JSON.stringify(),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result2 = await response2.json();
        } else {
          navigate("/nopage");
        }
      } else {
        navigate("/nopage");
      }
    };
    redirect();
  }, []);
  return <div></div>;
}
