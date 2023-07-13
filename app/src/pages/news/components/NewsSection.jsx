import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Skeleton } from "@mui/material";

const NewsSection = ({ data, handleSelectOdd, selectedItem, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
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
  }, [
    URL,
    URL_ONE,
    URL_TWO,
    URL_THREE,
    URL_FOUR,
    URL_FIVE,
    URL_SIX,
    URL_SEVEN,
    URL_EIGHT,
  ]);

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
          let imageUrl = "";

          const imageRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>\s*<br\s*\/>/;
          const descriptionMatch = description.match(imageRegex);
          if (descriptionMatch) {
            imageUrl = descriptionMatch[1];
            description = description.replace(imageRegex, "");
          } else {
            const encodedMatch = encodedContent.match(imageRegex);
            if (encodedMatch) {
              imageUrl = encodedMatch[1];
              encodedContent = encodedContent.replace(imageRegex, "");
            } else {
              const imageTagImageRegex = /<image>\s*<url>(.*?)<\/url>/;
              const imageTagImageContent =
                item.innerHTML.match(imageTagImageRegex);
              if (imageTagImageContent) {
                imageUrl = imageTagImageContent[1];
              } else {
                const imgRegex = /<img src="(.*?)"/;
                const imgContent = item.innerHTML.match(imgRegex);
                if (imgContent) {
                  imageUrl = imgContent[1];
                } else {
                  const imageTagImgRegex = /<img\s+src="([^"]+)"/g;
                  const imageTagImgContent =
                    item.innerHTML.matchAll(imageTagImgRegex);
                  for (const match of imageTagImgContent) {
                    imageUrl = match[1];
                    break; // Only take the first match
                  }
                  if (!imageUrl) {
                    const imageTagRegex = /<image>([^<]+)<\/image>/;
                    const imageTagContent = item.innerHTML.match(imageTagRegex);
                    if (imageTagContent) {
                      imageUrl = imageTagContent[1];
                    } else {
                      const enclosure = item.querySelector("enclosure");
                      if (enclosure && enclosure.hasAttribute("url")) {
                        imageUrl = enclosure.getAttribute("url");
                      }
                    }
                  }
                }
              }
            }
          }

          feedItemsData.push({
            title,
            link,
            pubDate,
            description,
            imageUrl,
            encodedContent,
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

  const extractImageUrl = (content) => {
    const imageRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/;
    const matches = content.match(imageRegex);
    if (matches) {
      return matches[1];
    }
    return "";
  };

  const openModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const sortedFeedItems = feedItems
    ?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .slice(0, 10);

  return (
    <div className="news_slider">
      {sortedFeedItems?.length > 0 &&
        sortedFeedItems.map((item) => (
          <div key={item?.link} className="news_slider_item">
            <div className="news_slider_content">
              <div className="top_section">
                {isLoading ? (
                  <Skeleton variant="rectangular" width={500} height={200} />
                ) : (
                  <>
                    {item?.imageUrl && <img src={item?.imageUrl} alt="news" />}
                    {!item.imageUrl && item.encodedContent && (
                      <img
                        src={extractImageUrl(item.encodedContent)}
                        alt="news"
                      />
                    )}
                  </>
                )}

                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={"100%"} height={20} />
                    <Skeleton variant="text" width={"100%"} height={20} />
                  </>
                ) : (
                  <>
                    {item?.description && (
                      <p
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        className={`news_description ${
                          item.imageUrl ? "" : "no_image"
                        }`}
                      />
                    )}
                  </>
                )}
              </div>

              <div className="news_button">
                {isLoading ? (
                  <Skeleton variant="rectangular" width={"100%"} height={40} />
                ) : (
                  <button onClick={() => openModal(item)}>Read more</button>
                )}
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
            {selectedNews?.encodedContent ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedNews?.encodedContent,
                }}
              />
            ) : (
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
