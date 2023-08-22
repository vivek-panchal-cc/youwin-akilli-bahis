import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Skeleton } from "@mui/material";
import useCurrentLanguage from "../../../misc";
const ImageLoader = React.lazy(() =>
  import("../../../components/common/imageLoader")
);

const NewsSection = ({
  data,
  handleSelectOdd,
  selectedItem,
  setNoNewsAvailable,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = useCurrentLanguage();
  const [selectedNews, setSelectedNews] = useState(null);
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const envKeys = [
    "REACT_APP_NEWS_FEED_API_BASE_PATH",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_ONE",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_TWO",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_THREE",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_FOUR",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_FIVE",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_SIX",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_SEVEN",
    "REACT_APP_NEWS_FEED_API_BASE_PATH_EIGHT",
  ];

  const rssFeedUrlsRef = useRef(envKeys.map((key) => process.env[key]));

  const parseRSSFeed = useCallback(
    async (urls) => {
      setIsLoading(true);
      const fetchPromises = urls.map(
        (url) =>
          axios
            .get(url, {
              headers: {
                Accept: "application/xml",
              },
            })
            .then((response) => ({ data: response.data }))
            .catch((error) => ({ error, data: null })) // Handle error here
      );

      const responses = await Promise.all(fetchPromises);

      const feedItemsData = [];
      responses?.forEach((response) => {
        if (response.error) {
          console.warn("Error fetching a RSS feed:", response.error);
          return; // Skip processing for this feed
        }
        const xmlText = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        let items;
        if (xmlDoc.querySelectorAll("entry").length > 0) {
          // This is an Atom feed
          items = xmlDoc.querySelectorAll("entry");
        } else {
          // This is an RSS feed
          items = xmlDoc.querySelectorAll("item");
        }
        Array.from(items)?.forEach((item) => {
          const title = item.querySelector("title")?.textContent || "";
          const link =
            item.querySelector("link[rel='alternate']")?.getAttribute("href") ||
            item.querySelector("link")?.textContent ||
            "";
          const pubDate =
            item.querySelector("published")?.textContent ||
            item.querySelector("pubDate")?.textContent ||
            "";
          let description =
            item.querySelector("content")?.textContent ||
            item.querySelector("description")?.textContent ||
            "";
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

      if (feedItemsData.length === 0 && responses.length === urls.length) {
        setNoNewsAvailable(true);
      } else {
        setNoNewsAvailable(false);
      }

      feedItemsData?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      const topFeedItems = feedItemsData?.slice(0, 10);
      setFeedItems(topFeedItems);
      setIsLoading(false);
    },
    [setIsLoading, setNoNewsAvailable, setFeedItems]
  );

  useEffect(() => {
    parseRSSFeed(rssFeedUrlsRef.current);
  }, [parseRSSFeed]);

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

  const sanitizeDescription = (desc) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${desc}</div>`, "text/html");
    const images = doc.querySelectorAll("img");
    images?.forEach((img) => img.remove());
    return doc.body.innerHTML;
  };

  return (
    <div className="news_slider">
      {!isLoading &&
        feedItems?.length > 0 &&
        feedItems.map((item) => (
          <div key={item?.link} className="news_slider_item">
            <div className="news_slider_content">
              <div className="top_section">
                {isLoading ? (
                  <Skeleton variant="rectangular" width={500} height={200} />
                ) : (
                  <>
                    {item?.imageUrl && (
                      <Suspense
                        fallback={
                          <Skeleton
                            variant="rectangular"
                            width={60}
                            height={60}
                            style={{
                              margin: "12px 10px 12px 10px",
                              width: "92%",
                              height: "200px",
                            }}
                          />
                        }
                      >
                        <ImageLoader
                          src={item?.imageUrl}
                          alt="news"
                          className="image_loader_news"
                          style={{
                            margin: "12px 10px 12px 10px",
                            width: "92%",
                            height: "200px",
                          }}
                        />
                      </Suspense>
                    )}
                    {!item.imageUrl && item.encodedContent && (
                      <Suspense
                        fallback={
                          <Skeleton
                            variant="rectangular"
                            width={60}
                            height={60}
                            style={{
                              margin: "12px 10px 12px 10px",
                              width: "92%",
                              height: "200px",
                            }}
                          />
                        }
                      >
                        <ImageLoader
                          src={extractImageUrl(item.encodedContent)}
                          alt="news"
                          className="image_loader_news"
                          style={{
                            margin: "12px 10px 12px 10px",
                            width: "92%",
                            height: "200px",
                          }}
                        />
                      </Suspense>
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
                        dangerouslySetInnerHTML={{
                          __html: sanitizeDescription(item.description),
                        }}
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
                  <button onClick={() => openModal(item)}>
                    {settings.staticString.readMore}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      {/* In case of no any news available in urls or failed to fetch */}
      {!isLoading && setNoNewsAvailable && feedItems.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh", // take the full viewport height
            width: "100%",
            textAlign: "center",
          }}
        >
          {settings.staticString.noNewsAvailable}
        </div>
      )}
      {isLoading &&
        [...Array(10)].map((item, index) => (
          <div key={index} className="news_slider_item">
            <div className="news_slider_content">
              <div className="top_section">
                <Skeleton variant="rectangular" width={500} height={200} />
                <Skeleton variant="text" width={"100%"} height={10} />
                <div className="news_button">
                  <Skeleton variant="rectangular" width={"100%"} height={37} />
                </div>
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
              <button onClick={closeModal}>
                {settings.staticString.close}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewsSection;
