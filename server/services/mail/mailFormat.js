const mailFormat = `<mjml>
  <mj-head>
    <mj-font name="Secular One" href="https://fonts.googleapis.com/css?family=Secular+One" />
    <mj-font name="Alef" href="https://fonts.googleapis.com/css?family=Alef" />
      <mj-style>
      * { direction: rtl; text-align: center !important; }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-container>
      <mj-section>
        <mj-column>
          <mj-text font-size="35px" color="#000000" font-family="Secular One, helvetica">עוז תקשורת</mj-text>
          <mj-divider border-color="#bf0a30"></mj-divider>
          <mj-text font-size="20px" color="#000000" font-family="Alef, helvetica">היי, זה אנחנו מעוז תקשורת!</mj-text>
          <mj-text font-size="14px" color="#000000" font-family="Alef, helvetica">צירפנו לך את הצעת המחיר כקובץ מצורף.</mj-text>
              <mj-text font-size="14px" color="#000000" font-family="Alef,helvetica">לכל שאלה, נשמח לעמוד לרשותכם בטלפון 0522-532970</mj-text>
               <mj-text font-size="14px" color="#000000" font-family="Alef,helvetica">או בכתובת המייל oz.tikshoret@gmail.com</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-divider border-color="#bf0a30"></mj-divider>
          <mj-text font-size="14px" color="#000000" font-family="Alef,helvetica">עוז תקשורת בע״מ</mj-text>
           <mj-text font-size="14px" color="#000000" font-family="Alef,helvetica">בקרוב, האתר החדש שלנו - https://www.oztikshoret.com</mj-text>
        </mj-column>
      </mj-section>
    </mj-container>
  </mj-body>
</mjml>`;

module.exports = mailFormat;