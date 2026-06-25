import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Heart } from 'lucide-react';

export default function PawPlayStore() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  const products = [
    {
      id: 1,
      name: 'Kit Quiz Patte',
      category: 'Éducation',
      price: 34.99,
      image: '🎮',
      description: 'Questions interactives pour stimuler l\'intelligence de ton animal',
      level: 'Débutant',
      color: '#FF6B6B'
    },
    {
      id: 2,
      name: 'Parcours Gamifié',
      category: 'Obstacle',
      price: 59.99,
      image: '🏃',
      description: 'Piste d\'apprentissage avec 5 niveaux de difficulté',
      level: 'Intermédiaire',
      color: '#FFD93D'
    },
    {
      id: 3,
      name: 'Récompense Level Up',
      category: 'Accessoire',
      price: 24.99,
      image: '🎁',
      description: 'Distributeur de friandises avec progression de jeu',
      level: 'Débutant',
      color: '#6BCB77'
    },
    {
      id: 4,
      name: 'Puzzle Contrôleur',
      category: 'Jeu',
      price: 44.99,
      image: '🧩',
      description: 'Puzzle éducatif en forme de patte avec 10 défis',
      level: 'Avancé',
      color: '#4D96FF'
    },
    {
      id: 5,
      name: 'Collier Connect',
      category: 'Tracking',
      price: 79.99,
      image: '📡',
      description: 'Suivi de progression avec app dédiée',
      level: 'Intermédiaire',
      color: '#7F77DD'
    },
    {
      id: 6,
      name: 'Bundle Démarrage',
      category: 'Pack',
      price: 99.99,
      image: '📦',
      description: 'Combo 3 produits pour débuter l\'aventure',
      level: 'Débutant',
      color: '#F0997B'
    }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🐾</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                PAWPLAY
              </h1>
              <p className="text-xs text-teal-600 font-semibold">Éducation Qui s'Amuse</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className={`font-medium transition ${currentPage === 'home' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
            >
              Accueil
            </button>
            <button
              onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
              className={`font-medium transition ${currentPage === 'products' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
            >
              Produits
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              className={`font-medium transition ${currentPage === 'about' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
            >
              À Propos
            </button>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-6 h-6 text-teal-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white p-4 space-y-4">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-gray-700 hover:text-teal-600"
            >
              Accueil
            </button>
            <button
              onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-gray-700 hover:text-teal-600"
            >
              Produits
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-gray-700 hover:text-teal-600"
            >
              À Propos
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-16">
            {/* Hero */}
            <section className="text-center space-y-6 py-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Une Patte, Mille Façons d'Apprendre
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Les accessoires éducatifs gamifiés pour tous tes animaux domestiques. Parce que l'apprentissage doit être <span className="font-bold text-teal-600">ludique et amusant</span>.
              </p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition transform hover:scale-105"
              >
                Découvrir les Produits →
              </button>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-100">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gamifiée</h3>
                <p className="text-gray-600">Les 4 couleurs du jeu (rouge/jaune/vert/bleu) intégrées dans chaque produit</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100">
                <div className="text-5xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tous les Animaux</h3>
                <p className="text-gray-600">Chats, chiens, rongeurs, oiseaux... Des solutions pour chaque animal</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100">
                <div className="text-5xl mb-4">👨‍👧‍👦</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Parents & Enfants</h3>
                <p className="text-gray-600">À partager ensemble pour des moments de complicité ludiques</p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl p-12 text-center space-y-6">
              <h3 className="text-3xl font-bold">Prêt à jouer, apprendre et grandir ensemble ?</h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Le slogan de PawPlay n'est pas qu'une phrase. C'est une promesse : rendre l'éducation de ton animal amusante.
              </p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Voir Tous les Produits
              </button>
            </section>
          </div>
        )}

        {/* PRODUCTS PAGE */}
        {currentPage === 'products' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Tous nos Produits</h2>
              <p className="text-gray-600">Sélectionnés pour rendre l'éducation animale ludique et engageante</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
                >
                  {/* Product Image */}
                  <div
                    style={{ backgroundColor: product.color + '20' }}
                    className="h-40 flex items-center justify-center text-7xl group-hover:scale-110 transition"
                  >
                    {product.image}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">{product.category}</p>
                        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="text-red-500 hover:scale-125 transition"
                      >
                        {favorites.includes(product.id) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">{product.price.toFixed(2)}€</p>
                        <p className="text-xs text-gray-500">{product.level}</p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-lg hover:shadow-lg transition transform hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-3xl space-y-8">
            <h2 className="text-4xl font-bold text-gray-800">À Propos de PawPlay</h2>

            <div className="bg-white rounded-xl p-8 border border-teal-100 space-y-4">
              <h3 className="text-2xl font-bold text-teal-600">Notre Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                PawPlay existe pour une raison simple : <span className="font-bold">l'éducation animale ne doit pas être ennuyeuse</span>. Nous croyons que les animaux domestiques apprennent mieux quand c'est ludique, engageant et amusant.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Notre slogan est notre promesse : <span className="font-bold text-teal-600">« Éducation Qui s'Amuse »</span>
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-blue-100 space-y-4">
              <h3 className="text-2xl font-bold text-blue-600">Notre Différence</h3>
              <p className="text-gray-700 leading-relaxed">
                Chaque produit PawPlay est conçu avec une philosophie unique : <span className="font-bold">gamifier l'apprentissage</span>. Les 4 couleurs représentent les 4 piliers du jeu éducatif :
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🔴</span>
                  <span className="text-gray-700"><strong>Rouge (Action)</strong> : Énergie et dynamisme</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🟡</span>
                  <span className="text-gray-700"><strong>Jaune (Apprentissage)</strong> : Joie et découverte</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🟢</span>
                  <span className="text-gray-700"><strong>Vert (Succès)</strong> : Croissance et progression</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🔵</span>
                  <span className="text-gray-700"><strong>Bleu (Confiance)</strong> : Fiabilité et sécurité</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-8 space-y-4">
              <h3 className="text-2xl font-bold">Joue. Apprends. Grandir Ensemble.</h3>
              <p>
                C'est plus qu'un produit. C'est une philosophie. Chez PawPlay, nous croyons que chaque moment passé avec ton animal peut être une opportunité d'apprentissage, de lien et de joy.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setCartOpen(false)} />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform z-40 overflow-y-auto ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">Panier</h3>
            <button
              onClick={() => setCartOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Ton panier est vide 🛒</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.price.toFixed(2)}€</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">{cartTotal.toFixed(2)}€</span>
                </div>
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105">
                  Passer la Commande
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-teal-900 to-blue-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span>
              <h3 className="text-xl font-bold">PAWPLAY</h3>
            </div>
            <p className="text-gray-300">Éducation Qui s'Amuse</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Produits</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Tous les Produits</li>
              <li>Packs Spéciaux</li>
              <li>Accessoires</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Infos</h4>
            <ul className="space-y-2 text-gray-300">
              <li>À Propos</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Suivre</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center py-6 text-gray-400">
          <p>© 2025 PawPlay • Tous droits réservés • Une patte, mille façons d'apprendre</p>
        </div>
      </footer>
    </div>
  );
}
