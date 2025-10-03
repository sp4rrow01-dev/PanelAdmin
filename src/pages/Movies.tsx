import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Film, ExternalLink, Eye, Search, X } from 'lucide-react';

interface Movie {
  tmdb_id: string;
  poster_url: string;
  titulo: string;
  anio: string;
  duracion: string;
  overview: string;
  backdrop_url: string;
  vote_average: string;
  popularity: string;
  generos: string[];
}

interface MovieForm {
  tmdb_id: string;
  poster_url: string;
  titulo: string;
  anio: string;
  duracion: string;
  overview: string;
  backdrop_url: string;
  vote_average: string;
  popularity: string;
  generos: string;
}

export const Movies = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<MovieForm>({
    tmdb_id: '',
    poster_url: '',
    titulo: '',
    anio: '',
    duracion: '',
    overview: '',
    backdrop_url: '',
    vote_average: '',
    popularity: '',
    generos: '',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://b.devalin.site/movies/search?query=${encodeURIComponent(searchQuery)}`,
          { credentials: 'include' }
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      tmdb_id: '',
      poster_url: '',
      titulo: '',
      anio: '',
      duracion: '',
      overview: '',
      backdrop_url: '',
      vote_average: '',
      popularity: '',
      generos: '',
    });
  };

  const handleSave = () => {
    console.log('Save movie:', formData);
  };

  const openTMDB = () => {
    if (formData.tmdb_id) {
      window.open(`https://www.themoviedb.org/movie/${formData.tmdb_id}`, '_blank');
    }
  };

  const selectMovie = (movie: Movie) => {
    setFormData({
      tmdb_id: movie.tmdb_id,
      poster_url: movie.poster_url,
      titulo: movie.titulo,
      anio: movie.anio,
      duracion: movie.duracion,
      overview: movie.overview,
      backdrop_url: movie.backdrop_url,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
      generos: movie.generos.join(', '),
    });
    setShowDropdown(false);
    setSearchQuery('');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <DashboardLayout>
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Film className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Advertencia</h3>
            </div>
            <p className="text-gray-600 mb-6">Primero suba una movie</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => navigate('/upload')}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Subir Movie
              </button>
            </div>
          </div>
        </div>
      )}

      {imagePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-8 h-8 text-orange-600" />
            <h3 className="text-2xl font-bold text-gray-900">Movies Management</h3>
          </div>

          <div className="relative mb-6" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar películas..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-10">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Buscando...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No se encontraron películas
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((movie) => (
                      <button
                        key={movie.tmdb_id}
                        onClick={() => selectMovie(movie)}
                        className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex gap-4"
                      >
                        <img
                          src={movie.poster_url}
                          alt={movie.titulo}
                          className="w-16 h-24 object-cover rounded shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="150"%3E%3Crect fill="%23ddd" width="100" height="150"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo img%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {movie.titulo} ({movie.anio})
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {truncateText(movie.overview, 120)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TMDB ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="tmdb_id"
                    value={formData.tmdb_id}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={openTMDB}
                    disabled={!formData.tmdb_id}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poster URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="poster_url"
                    value={formData.poster_url}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => formData.poster_url && setImagePreview(formData.poster_url)}
                    disabled={!formData.poster_url}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backdrop URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="backdrop_url"
                    value={formData.backdrop_url}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => formData.backdrop_url && setImagePreview(formData.backdrop_url)}
                    disabled={!formData.backdrop_url}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año
                </label>
                <input
                  type="text"
                  name="anio"
                  value={formData.anio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración (minutos)
                </label>
                <input
                  type="text"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vote Average
                </label>
                <input
                  type="text"
                  name="vote_average"
                  value={formData.vote_average}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Popularidad
                </label>
                <input
                  type="text"
                  name="popularity"
                  value={formData.popularity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Géneros
                </label>
                <input
                  type="text"
                  name="generos"
                  value={formData.generos}
                  onChange={handleInputChange}
                  placeholder="Acción, Drama, Ciencia Ficción"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};
