import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Instagram,
} from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: GitHub, url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: LinkedIn, url: 'https://linkedin.com/in/yourprofile' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/yourhandle' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/yourhandle' },
    { name: 'Email', icon: Email, url: 'mailto:your@email.com' },
  ];

  const footerLinks = {
    Product: ['Features', 'Courses', 'Pricing', 'Roadmap'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Support'],
    Company: ['About', 'Contact', 'Privacy', 'Terms'],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TechLearn
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
              Master technology skills with curated video tutorials, hands-on projects, 
              and a community of learners. Your journey to tech mastery starts here.
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={4} md={2.66} key={title}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}
              >
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TechLearn. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with ❤️ using React & MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;