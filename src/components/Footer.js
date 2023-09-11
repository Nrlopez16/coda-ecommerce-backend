import React, { useState, useEffect } from 'react';
import './Footer.css';
import Form from 'react-bootstrap/Form';
import { FaFacebookSquare, FaTwitterSquare, FaInstagram, FaPinterestSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
    return <>
        {/* THIS IS FOR THE FOOTER - needs to be styled*/}
    <footer className="footer-container">
        <div className="footer-parent-container">
            <div className="footer-child-container">
                <div className="content-div">
                    <div className="columns-div">
                        <div className="column-product">
                            <h4 className="columnheading">Products</h4>
                                <ul className="column-links">
                                    <li className="link-items">Effect Pedals</li>
                                    <li className="link-items">Electric Guitars</li>
                                    <li className="link-items">Electric Bases</li>
                                    <li className="link-items">Pianos & Keyboards</li>
                                    <li className="link-items">Microphones</li>
                                    <li className="link-items">DrumKits</li>
                                </ul>

                        </div>
                        <div className="column-support">
                            <h4 className="columnheading">Support</h4>
                                <ul className="column-links">
                                    <li className="link-items">Contact Us</li>
                                    <li className="link-items">FAQ</li>
                                    <li className="link-items">Returns</li>
                                    <li className="link-items">Warranty</li>
                                    <li className="link-items">Financing</li>
                                </ul>
                        </div>
                        <div className="column-about">
                            <h4 className="columnheading">About</h4>
                                <ul className="column-links">
                                    <li className="link-items">Our Story</li>
                                    <li className="link-items">Stores</li>
                                    <li className="link-items">Jobs</li>
                                    <li className="link-items">Press</li>
                                    <li className="link-items">Follow Us</li>
                                </ul>
                        </div>
                        <div className="column-Resources">
                            <h4 className="columnheading">Resources</h4>
                                <ul className="column-links">
                                    <li className="link-items">Reviews</li>
                                    <li className="link-items">Promos</li>
                                    <li className="link-items">Refer & Earn</li>
                                </ul>
                        </div>

                    </div>
                </div>

                {/* <!--THIS IS FOR THE EMAIL ADDRESS SEARCH BAR & SUBMIT--> */}
                <div className="signup">
                    <div className="column-heading-signup">
                        <h4 className="columnheading">Follow Us For The Latest Bounty</h4>
                    </div>
                    <div className="signup-content">
                        
                        <div className="signup-column">
                            <div className="footer-social-icons">
                                <a href="" className="fa fa-facebook">{<FaFacebookSquare/>}</a>
                                <a href="" className="fa fa-twitter">{<FaTwitterSquare/>}</a>
                                <a href="" className="fa fa-instagram">{<FaInstagram/>}</a>
                                <a href="" className="fa fa-pinterest">{<FaPinterestSquare/>}</a>
                                <a href="" className="fa fa-linkedin">{<FaLinkedin/>}</a>
                                <a href="" className="fa fa-youtube">{<FaYoutubeSquare/>}</a>
                            </div>
                            <div className="phone-parent-container">
                                <div className="phone-child-container">
                                    {/* <!--No interactivity yet--> */}
                                    <p>+1 123.456.7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-container">
                <div className="bottom-container-inner">
                    <span className="bottom-link-items">C 2020</span>
                    <span className="bottom-link-items">Privacy</span>
                    <span className="bottom-link-items">Terms</span>
                    <span className="bottom-link-items">Accessibility</span>
                    <span className="bottom-link-items">Sitemap</span>
                    <span className="bottom-link-items">Do Not Sell My Personal Information</span>
                </div>
            </div>
        </div>
    </footer>


    </>

}

export default Footer;