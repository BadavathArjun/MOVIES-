import React from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ExpandMore, Gavel, AccountBalance, Warning } from '@mui/icons-material';

const TermsOfService = () => {
  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing and using MovieCatalog, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.', icon: <Gavel /> },
    { title: 'Use License', content: 'Permission is granted to temporarily access the materials (information or software) on MovieCatalog for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose, attempt to decompile or reverse engineer any software contained on the site.', icon: <AccountBalance /> },
    { title: 'User Accounts', content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You must immediately notify us of any unauthorized uses of your account.', icon: <Warning /> },
    { title: 'Content and Conduct', content: 'You are responsible for all content you post and activity that occurs under your account. You may not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another\'s privacy, hateful, or racially, ethnically, or otherwise objectionable.', icon: <Gavel /> },
    { title: 'Intellectual Property', content: 'The service and its original content, features, and functionality are and will remain the exclusive property of MovieCatalog and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.', icon: <AccountBalance /> },
    { title: 'Termination', content: 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.', icon: <Warning /> }
  ];

  const prohibitedActivities = [
    'Creating fake accounts or impersonating others',
    'Harassing, abusing, or harming other users',
    'Posting spam, offensive, or inappropriate content',
    'Attempting to hack, damage, or disrupt our services',
    'Using automated tools to access our services without permission',
    'Violating any applicable laws or regulations'
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}> Terms of Service </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}> Last updated: January 15, 2024 </Typography>
      </Box>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> These Terms of Service ("Terms") govern your use of MovieCatalog and any related services provided by us. By accessing or using our service, you agree to be bound by these Terms. </Typography>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Agreement to Terms </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> By using our service, you represent that you are at least 13 years old and have the legal capacity to enter into these Terms. If you are using the service on behalf of an organization, you represent that you have authority to bind that organization to these Terms. </Typography>
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
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Prohibited Activities </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}> You agree not to engage in any of the following prohibited activities: </Typography>
        <List>
          {prohibitedActivities.map((activity, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText primary={`• ${activity}`} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Limitation of Liability </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> In no event shall MovieCatalog, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service. </Typography>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Governing Law </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> These Terms shall be interpreted and governed by the laws of the jurisdiction in which MovieCatalog is incorporated, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. </Typography>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Changes to Terms </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}> We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. </Typography>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}> Contact Information </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}> If you have any questions about these Terms, please contact us at: </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}> Email: legal@moviecatalog.com </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}> Address: 123 Movie Street, Cinema City, CC 12345 </Typography>
          <Typography variant="body2"> Phone: (555) 123-4567 </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
