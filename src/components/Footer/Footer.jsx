import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footerMenu contents">
        {FOOTER_LIST.map(menu => (
          <li className="footerMenuList" key={menu.id}>
            <a href={menu.link}>{menu.info}</a>
          </li>
        ))}
      </ul>
      <div className="companyInfo">
        <p className="companyName contents">엘보우시네마</p>
        <p className="adress contents">
          <span>주소 : 서울특별시 강남구 강남대로 000, 엘보우시네마 |</span>
          <span>대표이사 : 전동민 |</span>
          <span>사업자 등록번호 : 123-45-78945</span>
        </p>
        <p className="adress contents">
          <span>1600-1600 |</span>
          <span>help@elbowcinema.co.kr |</span>
          <span>
            통신판매업 신고번호: 제 0000-대한민국-0000호 | 사업자정보확인 |
            개인정보보호 책임자 : 전민성
          </span>
        </p>
        <p className="adress contents">
          <span>© ELBOW CINEMA. All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

const FOOTER_LIST = [
  { id: 1, link: '#', info: '회사소개' },
  { id: 2, link: '#', info: '지속가능경영' },
  { id: 3, link: '#', info: 'IR' },
  { id: 4, link: '#', info: '채용정보' },
  { id: 5, link: '#', info: '광고/제휴/출점문의' },
  { id: 6, link: '#', info: '이용약관' },
  { id: 7, link: '#', info: '편성기준' },
  { id: 8, link: '#', info: '개인정보처리방침' },
  { id: 9, link: '#', info: '법적고지' },
  { id: 10, link: '#', info: '이메일주소무단수집거부' },
  { id: 11, link: '#', info: '윤리경영' },
  { id: 12, link: '#', info: '사이버감사실' },
];
