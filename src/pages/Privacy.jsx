import React from "react";
import styled from "styled-components";
import {
  Container,
  List,
  ListItem,
  NormalPara,
  SectionHeading,
  SectionPara,
} from "../components/reusables/Styles";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <PrivacyPageContainer>
      <Container style={{ margin: "2rem auto 3rem" }}>
        <SectionHeading>Privacy & Policy</SectionHeading>
        <NormalPara>
          Acorn Tire & Auto, LLC (“us”, “we”, or “our”) operates the{" "}
          <Links to={"/"}>https://acornauto.com/ </Links> website (the
          “Service”).
        </NormalPara>
        <NormalPara>
          This page informs you of our policies regarding the collection, use
          and disclosure of Personal Information when you use our Service.
        </NormalPara>{" "}
        <NormalPara>
          We will not use or share your information with anyone except as
          described in this Privacy Policy.{" "}
        </NormalPara>
        <NormalPara>
          We use your Personal Information for providing and improving the
          Service. By using the Service, you agree to the collection and use of
          information in accordance with this policy. Unless otherwise defined
          in this Privacy Policy, terms used in this Privacy Policy have the
          same meanings as in our Terms and Conditions, accessible at{" "}
          <Links to={"/"}>https://acornauto.com/ </Links>{" "}
        </NormalPara>
        <OptimizedPara>Information Collection And Use</OptimizedPara>{" "}
        <NormalPara>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to, your email address, name, phone number, postal
          address, other information (“Personal Information”).{" "}
        </NormalPara>
        <NormalPara>
          We collect this information for the purpose of providing the Service,
          identifying and communicating with you, responding to your
          requests/inquiries, servicing your purchase orders, and improving our
          services.
        </NormalPara>
        <OptimizedPara>Log Data</OptimizedPara>
        <NormalPara>
          We may also collect information that your browser sends whenever you
          visit our Service (“Log Data”). This Log Data may include information
          such as your computer’s Internet Protocol (“IP”) address, browser
          type, browser version, the pages of our Service that you visit, the
          time and date of your visit, the time spent on those pages and other
          statistics.
        </NormalPara>
        <NormalPara>
          In addition, we may use third party services such as Google Analytics
          that collect, monitor and analyze this type of information in order to
          increase our Service’s functionality. These third party service
          providers have their own privacy policies addressing how they use such
          information.
        </NormalPara>
        <OptimizedPara>Cookies</OptimizedPara>
        <NormalPara>
          Cookies are files with a small amount of data, which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          web site and transferred to your device. We use cookies to collect
          information in order to improve our services for you.
        </NormalPara>
        <NormalPara>
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. The Help feature on most browsers provide
          information on how to accept cookies, disable cookies or to notify you
          when receiving a new cookie.
        </NormalPara>
        <NormalPara>
          If you do not accept cookies, you may not be able to use some features
          of our Service and we recommend that you leave them turned on.
        </NormalPara>
        <OptimizedPara>Behavioral Remarketing</OptimizedPara>
        <NormalPara>
          Acorn Tire & Auto, LLC uses remarketing services to advertise on third
          party web sites to you after you visited our Service. We, and our
          third party vendors, use cookies to inform, optimize and serve ads
          based on your past visits to our Service.
        </NormalPara>
        <List>
          <ListItem>
            <NormalPara>
              Google – Google AdWords remarketing service is provided by Google
              Inc.You can opt-out of Google Analytics for Display Advertising
              and customize the Google Display Network ads by visiting the
              Google Ads Settings page:{" "}
              <Links target="_blank" to="http://www.google.com/settings/ads">
                http://www.google.com/settings/ads
              </Links>{" "}
              Google also recommends installing the Google Analytics Opt-out
              Browser Add-on – {" "}
              <Links
                target="_blank"
                to="https://tools.google.com/dlpage/gaoptout"
              >
                https://tools.google.com/dlpage/gaoptout
              </Links>{" "}
                 – for your web browser. Google Analytics Opt-out Browser Add-on
              provides visitors with the ability to prevent their data from
              being collected and used by Google Analytics.For more information
              on the privacy practices of Google, please visit the Google
              Privacy Terms web page: {" "}
              <Links
                target="_blank"
                to="http://www.google.com/intl/en/policies/privacy/"
              >
                http://www.google.com/intl/en/policies/privacy/
              </Links>{" "}
            </NormalPara>
          </ListItem>
          <ListItem>
            <NormalPara>
              Facebook – Facebook remarketing service is provided by Facebook
              Inc.You can learn more about interest-based advertising from
              Facebook by visiting this page:  {" "}
              <Links
                target="_blank"
                to="https://www.facebook.com/help/164968693837950"
              >
                https://www.facebook.com/help/164968693837950
              </Links>{" "}
              To opt-out from Facebook’s interest-based ads follow these
              instructions from Facebook:{" "}
              <Links
                target="_blank"
                to="https://www.facebook.com/about/ads/#568137493302217"
              >
                https://www.facebook.com/about/ads/#568137493302217
              </Links>{" "}
               Facebook adheres to the Self-Regulatory Principles for Online
              Behavioral Advertising established by the Digital Advertising
              Alliance. You can also opt-out from Facebook and other
              participating companies through the Digital Advertising Alliance
              in the USA{" "}
              <Links target="_blank" to="http://www.aboutads.info/choices/">
                http://www.aboutads.info/choices/
              </Links>{" "}
              , the Digital Advertising Alliance of Canada in Canada {" "}
              <Links target="_blank" to="http://youradchoices.ca/">
                http://youradchoices.ca/
              </Links>{" "}
               or the European Interactive Digital Advertising Alliance in
              Europe , the Digital Advertising Alliance of Canada in Canada {" "}
              <Links target="_blank" to="http://www.aboutads.info/choices/">
                http://www.aboutads.info/choices/
              </Links>{" "}
              , the Digital Advertising Alliance of Canada in Canada   or the
              European Interactive Digital Advertising Alliance in Europe , the
              Digital Advertising Alliance of Canada in Canada{" "}
              <Links target="_blank" to="http://youradchoices.ca/">
                http://youradchoices.ca/
              </Links>{" "}
               or the European Interactive Digital Advertising Alliance in
              Europe{" "}
              <Links target="_blank" to="http://www.youronlinechoices.eu/">
                http://www.youronlinechoices.eu/
              </Links>{" "}
              , or opt-out using your mobile device settings.For more
              information on the privacy practices of Facebook, please visit
              Facebook’s Data
            </NormalPara>
          </ListItem>
          <ListItem>
            <NormalPara>
              {" "}
              Policy: https://www.facebook.com/privacy/explanation
            </NormalPara>
          </ListItem>
          <ListItem>
            <NormalPara>
              AdRoll – AdRoll remarketing service is provided by Semantic
              SugarYou can opt-out of AdRoll remarketing by visiting this AdRoll
              Advertising Preferences web page:{" "}
              <Links
                target="_blank"
                to="http://info.evidon.com/pub_info/573?v=1nt=1nw=false"
              >
                 http://info.evidon.com/pub_info/573?v=1nt=1nw=false
              </Links>{" "}
              For more information on the privacy practices of AdRoll, please
              visit the AdRoll Privacy Policy web page:{" "}
              <Links target="_blank" to="http://www.adroll.com/about/privacy">
                http://www.adroll.com/about/privacy
              </Links>{" "}
            </NormalPara>
          </ListItem>
        </List>
        <OptimizedPara>Do Not Track Disclosure</OptimizedPara>
        <NormalPara>
          We support Do Not Track (“DNT”). Do Not Track is a preference you can
          set in your web browser to inform websites that you do not want to be
          tracked.
        </NormalPara>
        <NormalPara>
          You can enable or disable Do Not Track by visiting the Preferences or
          Settings page of your web browser.
        </NormalPara>
        <OptimizedPara>Service Providers</OptimizedPara>
        <NormalPara>
          We may employ third party companies and individuals to facilitate our
          Service, to provide the Service on our behalf, to perform
          Service-related services and/or to assist us in analyzing how our
          Service is used.
        </NormalPara>
        <NormalPara>
          These third parties have access to your Personal Information only to
          perform specific tasks on our behalf and are obligated not to disclose
          or use your information for any other purpose.
        </NormalPara>
        <OptimizedPara>Communications</OptimizedPara>
        <NormalPara>
          We may use your Personal Information to contact you with newsletters,
          marketing or promotional materials and other information that may be
          of interest to you. You may opt out of receiving any, or all, of these
          communications from us by following the unsubscribe link or
          instructions provided in any email we send.
        </NormalPara>
        <OptimizedPara>Compliance With Laws</OptimizedPara>
        <NormalPara>
          We will disclose your Personal Information where required to do so by
          law or subpoena or if we believe that such action is necessary to
          comply with the law and the reasonable requests of law enforcement or
          to protect the security or integrity of our Service.
        </NormalPara>
        <OptimizedPara>Business Transaction</OptimizedPara>
        <NormalPara>
          If Acorn Tire & Auto, LLC is involved in a merger, acquisition or
          asset sale, your Personal Information may be transferred as a business
          asset. In such cases, we will provide notice before your Personal
          Information is transferred and/or becomes subject to a different
          Privacy Policy.
        </NormalPara>
        <OptimizedPara>Security</OptimizedPara>
        <NormalPara>
          The security of your Personal Information is important to us, and we
          strive to implement and maintain reasonable, commercially acceptable
          security procedures and practices appropriate to the nature of the
          information we store, in order to protect it from unauthorized access,
          destruction, use, modification, or disclosure.
        </NormalPara>
        <NormalPara>
          However, please be aware that no method of transmission over the
          internet, or method of electronic storage is 100% secure and we are
          unable to guarantee the absolute security of the Personal Information
          we have collected from you.
        </NormalPara>
        <OptimizedPara>International Transfer</OptimizedPara>
        <NormalPara>
          Your information, including Personal Information, may be transferred
          to — and maintained on — computers located outside of your state,
          province, country or other governmental jurisdiction where the data
          protection laws may differ than those from your jurisdiction.
        </NormalPara>
        <NormalPara>
          If you are located outside United States and choose to provide
          information to us, please note that we transfer the information,
          including Personal Information, to United States and process it there.
        </NormalPara>
        <NormalPara>
          Your consent to this Privacy Policy followed by your submission of
          such information represents your agreement to that transfer.
        </NormalPara>
        <OptimizedPara>Links To Other Sites</OptimizedPara>
        <NormalPara>
          Our Service may contain links to other sites that are not operated by
          us. If you click on a third party link, you will be directed to that
          third party’s site. We strongly advise you to review the Privacy
          Policy of every site you visit.
        </NormalPara>
        <NormalPara>
          We have no control over, and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </NormalPara>
        <OptimizedPara>Children’s Privacy</OptimizedPara>
        <NormalPara>
          Only persons age 18 or older have permission to access our Service.
          Our Service does not address anyone under the age of 13 (“Children”).
        </NormalPara>
        <NormalPara>
          We do not knowingly collect personally identifiable information from
          children under 13. If you are a parent or guardian and you learn that
          your Children have provided us with Personal Information, please
          contact us. If we become aware that we have collected Personal
          Information from a child under age 13 without verification of parental
          consent, we take steps to remove that information from our servers.
        </NormalPara>
        <OptimizedPara>Changes To This Privacy Policy</OptimizedPara>
        <NormalPara>
          This Privacy Policy is effective as of August 1, 2023 and will remain
          in effect except with respect to any changes in its provisions in the
          future, which will be in effect immediately after being posted on this
          page.
        </NormalPara>
        <NormalPara>
          We reserve the right to update or change our Privacy Policy at any
          time and you should check this Privacy Policy periodically. Your
          continued use of the Service after we post any modifications to the
          Privacy Policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          Privacy Policy.
        </NormalPara>
        <NormalPara>
          If we make any material changes to this Privacy Policy, we will notify
          you either through the email address you have provided us, or by
          placing a prominent notice on our website.
        </NormalPara>
        <OptimizedPara>Contact Us</OptimizedPara>
        <NormalPara>
          If you have any questions about this Privacy Policy, please contact
          us.
        </NormalPara>
      </Container>
    </PrivacyPageContainer>
  );
};

const PrivacyPageContainer = styled.div``;

const OptimizedPara = styled(SectionPara)`
  text-align: left;
`;

const Links = styled(Link)`
  text-decoration: underline;
  color: blue;
  &:hover {
    text-decoration: none;
  }
`;
export default Privacy;
