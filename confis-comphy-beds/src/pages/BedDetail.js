import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp, FaShare, FaTruck } from 'react-icons/fa';
import { bedData, deliveryInfo } from '../data/bedData';
import Footer from '../components/Footer';

const BedDetail = () => {
  const { id } = useParams();
  const [bed, setBed] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundBed = bedData.find(item => item.id === parseInt(id));
    setBed(foundBed);
  }, [id]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const message = `Check out this ${bed.name} from ConfisComphyBeds!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message + ' ' + window.location.href)}`;
    window.open(url, '_blank');
  };

  if (!bed) {
    return (
      <div className="container">
        <div className="no-results">
          <h2>Bed not found</h2>
          <Link to="/" className="back-button">
            <FaArrowLeft /> Back to Beds
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-button">
        <FaArrowLeft /> Back to Beds
      </Link>
      
      <div className="bed-detail">
        <div className="detail-content">
          <div className="detail-image">
            <img src={bed.image} alt={bed.name} />
          </div>
          
          <div className="detail-info">
            <h2>{bed.name}</h2>
            <p className="bed-type">{bed.type}</p>
            <p className="bed-price">R{bed.price.toFixed(2)}</p>
            <p className="bed-description">{bed.description}</p>
            
            <h3>Features</h3>
            <ul className="bed-features">
              {bed.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <div className="action-buttons">
              <button className="whatsapp-btn" onClick={shareWhatsApp}>
                <FaWhatsapp /> Share via WhatsApp
              </button>
              <button className="share-btn" onClick={copyLink}>
                <FaShare /> {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            
            <div className="delivery-section">
              <button 
                className="delivery-toggle"
                onClick={() => setShowDelivery(!showDelivery)}
              >
                <FaTruck /> Delivery Information {showDelivery ? '▲' : '▼'}
              </button>
              
              {showDelivery && (
                <div className="delivery-details">
                  <p><strong>Standard Delivery:</strong> ${deliveryInfo.standard}</p>
                  <p><strong>Express Delivery:</strong> ${deliveryInfo.express}</p>
                  <p><strong>Setup Service:</strong> ${deliveryInfo.setup}</p>
                  <p>{deliveryInfo.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BedDetail;