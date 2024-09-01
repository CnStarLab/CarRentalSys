import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQSection() {
  const faqs = [
    { title: 'Question 1', content: 'Content for FAQ 1.' },
    { title: 'Question 2', content: 'Content for FAQ 2.' },
    { title: 'Question 3', content: 'Content for FAQ 3.' },
    { title: 'Question 4', content: 'Content for FAQ 4.' },
  ];

  return (
    <Box py={10} sx={{ px: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Frequently Asked Questions
      </Typography>
      <Box maxWidth="md" mx="auto">
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold' }}>{faq.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {faq.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
``
