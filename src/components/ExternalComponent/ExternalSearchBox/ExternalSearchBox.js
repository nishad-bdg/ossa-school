// import React from 'react';
import './ExternalSearchBox.css';
import { faA, faMapLocationDot, faSearch, faTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const ExternalSearchBox = () => {
    const [country, setCountry] = useState('');
    const [capital, setCapital] = useState('');
    // const searchValue = useRef();
    const [searchLocation, setSearchLocation] = useState('');
    let history = useHistory();

    const handleOptionOne = e => {
        setCountry(e.target.value)
    }
    const handleOption2 = e => {
        setCapital(e.target.value)
    }

    const handleInput = e => {
        setSearchLocation(e.target.value)
    }

    const handleSearch = e => {
        e.preventDefault();
        console.log(searchLocation)
        // console.log(country, capital, searchLocation)
        history.push('/s?keywords=' + searchLocation);
        setCountry('');
        setCapital('');
        setSearchLocation('');
    }



    return (
        <div>
            <div className="container">
                <div>
                    <div className='text-center'>
                        <form action="" onSubmit={handleSearch}>
                            <div className='d-flex justify-content-center mt-4'>
                                <p><FontAwesomeIcon icon={faA} /><select onBlur={handleOptionOne} className='search-select' name="" id="">
                                    <option value="">国を選択する</option>
                                    <option value="c-1">India</option>
                                    <option value="c-2">China</option>
                                </select></p>
                                <p><FontAwesomeIcon icon={faTree} /><select onBlur={handleOption2} className='search-select' name="" id="">
                                    <option value="">都市を選択する</option>
                                    <option value="d-1">dillhi</option>
                                    <option value="d-2">beiging</option>
                                </select></p>
                                <div className='d-flex' style={{ padding: '17px 8px' }}><FontAwesomeIcon className='mt-2 mx-2' icon={faMapLocationDot} />

                                    <div className='input-field-div'>
                                        <FontAwesomeIcon className='mx-2 mt-3' icon={faSearch} /><input type="text" name='location' onChange={handleInput} className='search-input-field' placeholder='学校名で検索する' />
                                    </div>
                                </div>
                                <button type='submit' className='btn search-button' >検索する</button>
                                {/* <Link to="/s"><button className='btn search-button' >検索する</button></Link> */}
                                {/* <p><button className='btn search-button' onClick={routeChange}>検索する</button></p> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExternalSearchBox;