import { useEffect, useState } from "react";
import "./App.css";
import { fetchArticles } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;
    const loadImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results, total_pages } = await fetchArticles(query, page);
        setImages((prevImages) => [...prevImages, ...results]);

        setTotalPages(total_pages);
      } catch (error) {
        setError("Error fetching images.");
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, [query, page]);

  const searchSubmit = (newQuery) => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={searchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        imageUrl={largeImage}
        onClose={closeModal}
        isOpen={showModal}
      />
    </div>
  );
};

export default App;
