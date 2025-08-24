import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { bedData } from '../data/bedData';
import Footer from '../components/Footer';

const Home = () => {
  const [beds, setBeds] = useState(bedData);
  const [filteredBeds, setFilteredBeds] = useState(bedData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter beds based on search term and type
  useEffect(() => {
    let result = beds;
    
    if (filterType !== 'all') {
      result = result.filter(bed => bed.type === filterType);
    }
    
    if (searchTerm) {
      result = result.filter(bed => 
        bed.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBeds(result);
  }, [searchTerm, filterType, beds]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  return (
    <div className="container">
      <div className="controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search beds by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => handleFilter('all')}
          >
            <FaFilter /> All Beds
          </button>
          <button 
            className={filterType === 'mattress' ? 'active' : ''}
            onClick={() => handleFilter('mattress')}
          >
            Mattresses
          </button>
          <button 
            className={filterType === 'frame' ? 'active' : ''}
            onClick={() => handleFilter('frame')}
          >
            Bed Frames
          </button>
          <button 
            className={filterType === 'adjustable' ? 'active' : ''}
            onClick={() => handleFilter('adjustable')}
          >
            Adjustable Beds
          </button>
        </div>
      </div>
      
      <div className="bed-grid">
        {filteredBeds.length > 0 ? (
          filteredBeds.map(bed => (
            <div key={bed.id} className="bed-card">
              <div className="bed-image">
                <img src={bed.image} alt={bed.name} />
              </div>
              <div className="bed-info">
                <h3>{bed.name}</h3>
                <p className="bed-type">{bed.type}</p>
                <p className="bed-price">${bed.price.toFixed(2)}</p>
                <Link to={`/bed/${bed.id}`}>
                  <button className="view-details-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h2>No beds found matching your criteria</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;