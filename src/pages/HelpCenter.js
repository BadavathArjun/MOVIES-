import React from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Grid, Card, CardContent, Button, TextField, Alert } from '@mui/material';
import { ExpandMore, Help, Search, ContactSupport, Article, LiveHelp, Email } from '@mui/icons-material';

const HelpCenter = () => {
  const faqs = [
    { question: 'How do I create an account?', answer: 'Click on the "Sign Up" button in the top navigation. Fill in your email, password, and display name. You\'ll receive a confirmation email to verify your account.' },
    { question: 'How do I search for movies?', answer: 'Use the search bar at the top of the page. You can search by movie title, actor name, director, or genre. Use filters to narrow down your results by year, type, or rating.' },
    { question: 'How do I create and manage movie lists?', answer: 'After signing in, go to your Dashboard and click "Create New List". You can add movies to your lists from the movie detail pages or search results.' },
    { question: 'How do I reset my password?', answer: 'Click "Sign In" then "Forgot Password". Enter your email address and we\'ll send you a password reset link.' },
    { question: 'Can I share my movie lists with others?', answer: 'Yes! You can make your lists public and share the link with friends. Public lists can be viewed by anyone with the link.' },
    { question: 'How do I report inappropriate content?', answer: 'Use the "Report" button on any movie page or user profile. Our moderation team will review the report within 24 hours.' },
    { question: 'What devices can I use to access MovieCatalog?', answer: 'MovieCatalog works on all modern web browsers on desktop, tablet, and mobile devices. We recommend using the latest version of Chrome, Firefox, Safari, or Edge.' },
    { question: 'Is my personal information safe?', answer: 'Yes, we take privacy seriously. All data is encrypted and stored securely. We never share your personal information with third parties without your consent.' }
  ];

  const helpCategories = [
    { title: 'Getting Started', icon: <Help />, description: 'Learn the basics of using MovieCatalog', articles: ['Creating Your Account', 'Navigating the Site', 'Understanding Ratings'] },
    { title: 'Account & Profile', icon: <ContactSupport />, description: 'Manage your account settings and preferences', articles: ['Updating Profile Information', 'Privacy Settings', 'Notification Preferences'] },
    { title: 'Movie Features', icon: <Article />, description: 'Discover all movie-related features', articles: ['Advanced Search', 'Creating Lists', 'Movie Recommendations'] },
    { title: 'Troubleshooting', icon: <LiveHelp />, description: 'Common issues and their solutions', articles: ['Login Problems', 'Search Not Working', 'Slow Loading'] }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}> Help Center </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}> Find answers to common questions and get the help you need </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}> Search Help Articles </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <TextField fullWidth placeholder="Search for help..." variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
              <Button variant="contained" size="large" sx={{ px: 4, borderRadius: 3 }}> <Search /> </Button>
            </Box>
          </Paper>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}> Frequently Asked Questions </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index} elevation={0} sx={{ mb: 1, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}> {faq.question} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}> {faq.answer} </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary"> Help Categories </Typography>
            {helpCategories.map((category, index) => (
              <Card key={index} elevation={0} sx={{ mb: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main' }}>{category.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}> {category.title} </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}> {category.description} </Typography>
                  <Box>
                    {category.articles.map((article, idx) => (
                      <Typography key={idx} variant="body2" sx={{ mb: 0.5, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}> • {article} </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom color="primary"> Still Need Help? </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}> Can't find what you're looking for? Our support team is here to help. </Typography>
            <Button variant="contained" fullWidth size="large" startIcon={<Email />} sx={{ mb: 2, borderRadius: 3 }}> Contact Support </Button>
            <Button variant="outlined" fullWidth size="large" startIcon={<LiveHelp />} sx={{ borderRadius: 3 }}> Live Chat </Button>
            <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}> <Typography variant="body2"> Average response time: 2-4 hours </Typography> </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelpCenter;
