import React from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import { ExpandMore, Security, DataUsage, PrivacyTip } from '@mui/icons-material';

const PrivacyPolicy = () => {
  const sections = [
    { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, and any movie preferences you share. We also automatically collect certain information about your device and usage of our services.', icon: <DataUsage /> },
    { title: 'How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about products, services, and promotions, and respond to your comments and questions.', icon: <PrivacyTip /> },
    { title: 'Information Sharing and Disclosure', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website or conducting our business.', icon: <Security /> },
    { title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.', icon: <Security /> },
    { title: 'Your Rights and Choices', content: 'You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.', icon: <PrivacyTip /> },
    { title: 'Cookies and Tracking Technologies', content: 'We use cookies and similar technologies to enhance your experience on our website, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.', icon: <DataUsage /> }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}> Privacy Policy </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}> Last updated: January 15, 2024 </Typography>
      </Box>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> This Privacy Policy describes how MovieCatalog ("we," "us," or "our") collects, uses, and protects your personal information when you use our website and services. </Typography>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Our Commitment to Privacy </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> Your privacy is important to us. We are committed to protecting your personal information and being transparent about our practices. This policy explains what information we collect, how we use it, and your rights regarding your data. </Typography>
        <Divider sx={{ my: 4 }} />
        {sections.map((section, index) => (
          <Accordion key={index} elevation={0} sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: 'primary.main' }}>{section.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}> {section.title} </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 3 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}> {section.content} </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Contact Us </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}> If you have any questions about this Privacy Policy or our data practices, please contact us at: </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}> Email: privacy@moviecatalog.com </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}> Address: 123 Movie Street, Cinema City, CC 12345 </Typography>
          <Typography variant="body2"> Phone: (555) 123-4567 </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: 'text.secondary' }}> This privacy policy may be updated from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
