import React from 'react'
import styles from './footer.module.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={` container ${styles.firstPart}`}>
        <div>
          <div>
            <h6>about us</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, debitis quibusdam perferendis culpa similique nobis quaerat consectetur vitae dolorem sed veniam dolores, voluptatum rerum velit eligendi aspernatur error facere veritatis?</p>
          </div>
          <div>
            <h6> follow us</h6>
            <div className={styles.footerIcon}>
              <div><i className="fa-brands fa-facebook-f"></i></div>
              <div><i className="fa-brands fa-instagram"></i></div>
            </div>
          </div>
        </div>

        <div>
          <h6>my account</h6>
          <ul>
            <li><Link>my account  </Link></li>
            <li><Link>wish list </Link></li>
            <li><Link>login </Link></li>
            <li><Link>new product </Link></li>
            <li><Link>fqa </Link></li>
          </ul>
        </div>

        <div>
          <h6>support</h6>
          <ul>
            <li><Link>facebook  </Link></li>
            <li><Link>help center </Link></li>
            <li><Link>contact us </Link></li>
            <li><Link>store location </Link></li>
            <li><Link>customer service </Link></li>
          </ul>
        </div>

        <div className={styles.contactInfo}>
          <h6>contact info</h6>
          <div>
            <p>call :-</p>
            <p>01001865858</p>
          </div>
          <div>
            <p>address :-</p>
            <p>mansoursa </p>
          </div>
          <div>
            <p>mail :-</p>
            <p>shop@gmail.com </p>
          </div>
        </div>
      </div>
      <p className={`container `}>copy right &copy;2024 , all right reserver to our team </p>
    </div>
  )
}

export default Footer
