import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import newsImage from "../../../assets/images/news_temp.png";
import axios from "axios";

/**
 *
 * PopularOdds - component use for all popular odds show.
 *
 * @param data - data comes from firebase.
 *
 */

const NewsSection = ({ data, handleSelectOdd, selectedItem }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const URL = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH;
  const URL_ONE = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_ONE;
  const URL_TWO = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_TWO;
  const URL_THREE = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_THREE;
  const URL_FOUR = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_FOUR;
  const URL_FIVE = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_FIVE;
  const URL_SIX = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_SIX;
  const URL_SEVEN = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_SEVEN;
  const URL_EIGHT = process.env.REACT_APP_NEWS_FEED_API_BASE_PATH_EIGHT;

  useEffect(() => {
    const rssFeedUrls = [
      URL,
      URL_ONE,
      URL_TWO,
      URL_THREE,
      URL_FOUR,
      URL_FIVE,
      URL_SIX,
      URL_SEVEN,
      URL_EIGHT,
    ];
    parseRSSFeed(rssFeedUrls);
  }, []);

  const parseRSSFeed = async (urls) => {
    try {
      const fetchPromises = urls.map((url) => {
        return axios.get(url, {
          headers: {
            Accept: "application/xml",
          },
        });
      });

      const responses = await Promise.all(fetchPromises);

      const feedItemsData = [];
      responses.forEach((response) => {
        const xmlText = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        const items = xmlDoc.querySelectorAll("item");
        Array.from(items).forEach((item) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          let description =
            item.querySelector("description")?.textContent || "";
          let encodedContent =
            item.getElementsByTagNameNS("*", "encoded")[0]?.textContent || "";
          const imageRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>\s*<br\s*\/>/

          let imageUrl = "";

          // Check if <img> tag is present in the description
          const descriptionMatch = description.match(imageRegex);
          if (descriptionMatch) {
            imageUrl = descriptionMatch[1];
            // Remove the <img> tag from the description
            description = description.replace(imageRegex, "");
          } else {
            // If <img> tag is not found in the description, check content:encoded
            let encodedMatch = encodedContent.match(imageRegex);
            if (encodedMatch) {
              imageUrl = encodedMatch[1];
              // Remove the <img> tag from the encodedContent
              encodedContent = encodedContent.replace(imageRegex, "");
            }
          }

          feedItemsData.push({
            title,
            link,
            pubDate,
            description,
            imageUrl,
          });
        });
      });

      console.log("feedItemsData: ", feedItemsData);

      feedItemsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setFeedItems(feedItemsData);
    } catch (error) {
      console.log("Error fetching or parsing RSS feeds:", error);
    }
  };

  // const parseRSSFeed = async (url) => {
  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Accept: "application/xml",
  //       },
  //     });
  //     const xmlText = response.data;
  //     const parser = new DOMParser();
  //     const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  //     const items = xmlDoc.querySelectorAll("item");
  //     const feedItemsData = Array.from(items).map((item) => {
  //       const title = item.querySelector("title")?.textContent || "";
  //       const link = item.querySelector("link")?.textContent || "";
  //       const pubDate = item.querySelector("pubDate")?.textContent || "";
  //       const description =
  //         item.querySelector("description")?.textContent || "";
  //       const encodedContent =
  //         item.getElementsByTagNameNS("*", "encoded")[0]?.textContent || "";
  //       const imageRegex = /<img[^>]+src=["'](.*?)["']/;
  //       const match = encodedContent.match(imageRegex);
  //       const imageUrl = match ? match[1] : "";

  //       return {
  //         title,
  //         link,
  //         pubDate,
  //         description,
  //         imageUrl,
  //       };
  //     });
  //     feedItemsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  //     setFeedItems(feedItemsData);
  //     // console.log("Feed Data", feedItemsData);
  //   } catch (error) {
  //     console.log("Error fetching or parsing RSS feed:", error);
  //   }
  // };

  const openModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <div className="news_slider">
      {feedItems?.length > 0 &&
        feedItems
          ?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .map((item) => (
            <div key={item?.link} className="news_slider_item">
              <div className="news_slider_content">
                <div className="top_section">
                  {item?.imageUrl && <img src={item?.imageUrl} alt="news" />}
                  {item?.description && (
                    <p
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className={`news_description ${
                        item.imageUrl ? "" : "no_image"
                      }`}
                    />
                  )}
                </div>

                <div className="news_button">
                  <button onClick={() => openModal(item)}>Read more</button>
                </div>
              </div>
            </div>
          ))}

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        className="news_modal_container"
      >
        <Modal.Body>
          <div className="modal_content">
            {selectedNews?.imageUrl && (
              <img src={selectedNews?.imageUrl} alt="news" />
            )}
            <h3>{selectedNews?.title}</h3>
            {selectedNews?.description && (
              <p
                dangerouslySetInnerHTML={{ __html: selectedNews?.description }}
              />
            )}
            <div className="close_button">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewsSection;
