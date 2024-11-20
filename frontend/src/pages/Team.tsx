import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import {
  Email,
  LinkedIn,
  Phone,
} from '@mui/icons-material';

export const Team: React.FC = () => {
  const directors = [
    {
      name: 'JAGDISH KAUSHAL',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'jagdish.kaushal@chembio.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'https://linkedin.com/in/jagdish-kaushal',
    },
    {
      name: 'RAJNI KAUSHAL',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'rajni.kaushal@chembio.com',
      phone: '+1 (555) 123-4568',
      linkedin: 'https://linkedin.com/in/rajni-kaushal',
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Head of Research & Development',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'sarah.johnson@chembio.com',
      phone: '+1 (555) 123-4569',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Product Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'michael.chen@chembio.com',
      phone: '+1 (555) 123-4570',
      linkedin: 'https://linkedin.com/in/michael-chen',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Quality Control Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'emily.rodriguez@chembio.com',
      phone: '+1 (555) 123-4571',
      linkedin: 'https://linkedin.com/in/emily-rodriguez',
    },
    {
      name: 'David Kim',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'david.kim@chembio.com',
      phone: '+1 (555) 123-4572',
      linkedin: 'https://linkedin.com/in/david-kim',
    },
    {
      name: 'Lisa Patel',
      role: 'Sales Director',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'lisa.patel@chembio.com',
      phone: '+1 (555) 123-4573',
      linkedin: 'https://linkedin.com/in/lisa-patel',
    },
    {
      name: 'James Wilson',
      role: 'Technical Support Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'james.wilson@chembio.com',
      phone: '+1 (555) 123-4574',
      linkedin: 'https://linkedin.com/in/james-wilson',
    },
    {
      name: 'Maria Garcia',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'maria.garcia@chembio.com',
      phone: '+1 (555) 123-4575',
      linkedin: 'https://linkedin.com/in/maria-garcia',
    },
    {
      name: 'Robert Taylor',
      role: 'Supply Chain Manager',
      image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      email: 'robert.taylor@chembio.com',
      phone: '+1 (555) 123-4576',
      linkedin: 'https://linkedin.com/in/robert-taylor',
    },
  ];

  const TeamMemberCard = ({ member }: { member: typeof directors[0] }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 280,
          objectFit: 'cover',
        }}
        image={member.image}
        alt={member.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {member.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          {member.role}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <IconButton
            size="small"
            color="primary"
            component="a"
            href={`mailto:${member.email}`}
            title={member.email}
          >
            <Email />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            component="a"
            href={`tel:${member.phone}`}
            title={member.phone}
          >
            <Phone />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            component="a"
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'grey.50', py: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Our Team
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Meet the dedicated professionals behind Chembio Lifescience's success
          </Typography>
        </Box>

        {/* Directors Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}
          >
            Leadership
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {directors.map((director) => (
              <Grid item key={director.name} xs={12} sm={6} md={6}>
                <TeamMemberCard member={director} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Team Members Section */}
        <Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}
          >
            Our Experts
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item key={member.name} xs={12} sm={6} md={3}>
                <TeamMemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
