import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from "@mui/material/DialogTitle";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReactFlagsSelect from 'react-flags-select';
import './PaymentHome.css';

// Transition for the dialog box
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Country data

// Add Card Component
const AddCardPage: React.FC<{ onCancel: () => void; onAddCard: (cardData: any) => void }> = ({
  onCancel,
  onAddCard,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    email: '',
    address: '',
    state: '',
    zip: '',
    city: '',
    country: '',
  });
  const [select, setSelect] = useState('SE');
  const onSelect = (code: any) => setSelect(code);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAddCard(formData); // Pass card data to parent
    setFormData({
      name: '',
      cardNumber: '',
      expiryDate: '',
      email: '',
      address: '',
      state: '',
      zip: '',
      city: '',
      country: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      cardNumber: '',
      expiryDate: '',
      email: '',
      address: '',
      state: '',
      zip: '',
      city: '',
      country: '',
    });
    onCancel(); // Close the dialog box
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
      <h1 style={styles.header}>Add Card</h1>
      <p style={styles.subHeader}>We don’t share your payment details with anyone.</p>

      {/* Name */}
      <label htmlFor="name" style={styles.cardLabel}>
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Card Number */}
      <label htmlFor="cardNumber" style={styles.cardLabel}>
        Card
      </label>
      <div style={styles.row}>
        <input
          id="cardNumber"
          type="text"
          name="cardNumber"
          placeholder="** ** ** **"
          value={formData.cardNumber}
          onChange={handleChange}
          style={styles.smallInput}
        />
        <input
          id="expiryDate"
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          value={formData.expiryDate}
          onChange={handleChange}
          style={styles.smallInput}
        />
      </div>
      {/* Email */}
      <label htmlFor="email" style={styles.cardLabel}>
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="user@email.com"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Address */}
      <label htmlFor="address" style={styles.cardLabel}>
        Address
      </label>
      <input
        id="address"
        type="text"
        name="address"
        placeholder="Enter address"
        value={formData.address}
        onChange={handleChange}
        style={styles.input}
      />

      {/* State, ZIP */}
      <label htmlFor="state" style={styles.cardLabel}>
        State
      </label>
      <div style={styles.row}>
        <input
          id="state"
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          style={styles.smallInput}
        />

        <input
          id="zip"
          type="text"
          name="zip"
          placeholder="ZIP"
          value={formData.zip}
          onChange={handleChange}
          style={styles.smallInput}
        />
      </div>

      {/* City */}
      <label htmlFor="city" style={styles.cardLabel}>
        City
      </label>
      <input
        id="city"
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Country */}
      <label htmlFor="country" style={styles.cardLabel}>
        Country
      </label>
      <div>
        <ReactFlagsSelect
          selected={select}
          className="dropdown"
          onSelect={onSelect}
          countries={['US', 'GB', 'IE', 'IT', 'NL', 'SE']}
          customLabels={{
            US: { primary: 'United States', secondary: '+1' },
            GB: { primary: 'England', secondary: '+44' },
            IE: { primary: 'Ireland', secondary: '+353' },
            IT: { primary: 'Italy', secondary: '+39' },
            NL: { primary: 'Netherlands', secondary: '+31' },
            SE: { primary: 'Sweden', secondary: '+46' },
          }}
        />
      </div>
      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button onClick={handleCancel} style={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleSubmit} style={styles.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
};

// Main Card List Page Component
const CardListPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]); // State to store card data

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Function to handle adding a new card
  const handleAddCard = (cardData: any) => {
    setCards((prevCards) => [...prevCards, cardData]); // Add card to the list
    handleDialogClose(); // Close the dialog
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Payment</h1>
      <p style={styles.subHeader}>We don’t share your payment details with anyone.</p>
      <div style={styles.cardContainer}>
        {/* Render Existing Cards */}
        {cards.map((card, index) => (
          <div style={styles.card} key={index}>
            <div style={styles.cardHeader}>
              <span style={styles.defaultBadge}>{index === 0 ? 'Default' : ''}</span>
            </div>
            <div style={styles.cardContent}>
              <p style={styles.cardText}>{card.name}</p>
              <div style={styles.cardDetailsBox}>
                <div style={styles.cardDetails}>
                  <span style={styles.cardLabel}>Card</span>
                  <div style={styles.iconContainer}>
                    {/* Payment Icon */}
                    <img src="/card-icon.png" style={styles.icon} height={24} />
                  </div>
                  <span style={styles.cardText}>* * ** {card.cardNumber.slice(-4)}</span>
                  <span style={styles.expiryDate}>{card.expiryDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Button */}
        <button style={styles.addButton} onClick={handleDialogOpen}>
          Add Card
        </button>

        {/* Dialog */}
        <Dialog open={dialogOpen} TransitionComponent={Transition} keepMounted onClose={handleDialogClose}>
          <DialogContent>
            <AddCardPage onCancel={handleDialogClose} onAddCard={handleAddCard} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    fontFamily: 'Roboto, sans-serif', // Updated font-family
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      padding: '20px',
    },
    '@media (max-width: 480px)': {
      padding: '10px',
    },
  },
  header: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Roboto, sans-serif', // Updated font-family

    marginBottom: '8px',

    textAlign: 'left' as const,
    '@media (max-width: 768px)': {
      fontSize: '24px',
    },
    '@media (max-width: 480px)': {
      fontSize: '20px',
    },
  },
  subHeader: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '32px',
    textAlign: 'left' as const,
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    padding: '24px',
    borderRadius: '14px',
    backgroundColor: '#fff',
    border: '2.5px solid #ddd',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    position: 'relative' as const,
    boxShadow: 'none',
    '@media (max-width: 768px)': {
      padding: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
    },
  },
  cardHeader: {
    position: 'absolute' as const,
    top: '0px',
    left: '16px',
    backgroundColor: '#007BFF',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '12px',
    fontFamily: 'Roboto, sans-serif', // Updated font-family
    padding: '4px 8px',
    borderRadius: '0px 0px 10px 10px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginTop: '22px',
  },
  cardText: {
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif', // Updated font-family
    fontWeight: '600',
    color: '#333',
    '@media (max-width: 480px)': {
      fontSize: '14px',
    },
  },
  cardDetailsBox: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  cardLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif', // Updated font-family
    color: '#6c757d',
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  addButton: {
    padding: '12px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '25px 25px 25px 25px',
    fontWeight: '400',
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif', // Updated font-family
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'background-color 0.3s',
    alignSelf: 'flex-start',
    '@media (max-width: 480px)': {
      padding: '10px 12px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    width: '385px',
    borderRadius: '46px',
    backgroundColor: '#f4f4f4',
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '12px',
    },
  },
  smallInput: {
    flex: 1,
    margin: '2px',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '46px',
    backgroundColor: '#f4f4f4',
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '12px',
    },
  },
  row: {
    display: 'flex',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '5px',
    },
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '30px',
    '@media (max-width: 480px)': {
      padding: '6px 12px',
    },
  },
  saveButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '30px',
    '@media (max-width: 480px)': {
      padding: '8px 12px',
    },
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '18px',
    marginRight: '8px',
  },
  expiryDate: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  defaultBadge: {
    fontSize: '10px',
    color: '#fff',
  },
};

export default CardListPage;
