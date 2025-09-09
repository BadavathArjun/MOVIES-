import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        This Privacy Policy describes how Movies Catalog collects, uses, and protects your personal information when you use our service.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Information We Collect</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We collect information you provide directly to us, such as when you create an account, add movies to your lists, or contact us for support. This may include your email address, username, and movie preferences.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How We Use Your Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Information Sharing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Data Security</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Your Rights</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting us directly.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Last updated: January 2024
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
