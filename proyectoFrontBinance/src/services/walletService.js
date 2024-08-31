const baseURL = 'http://localhost:3000/api';

export const getUserWallets = (userId) => {
  return fetch(`${baseURL}/billeteras/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(response => response.json());
};

export const createWallet = (walletData) => {
  return fetch(`${baseURL}/billeteras`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(walletData),
  }).then(response => response.json());
};

export const getWallet = (walletId) => {
  return fetch(`${baseURL}/billeteras/${walletId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(response => response.json());
};

export const updateWallet = (walletId, walletData) => {
  return fetch(`${baseURL}/billeteras/${walletId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(walletData),
  }).then(response => response.json());
};

export const deleteWallet = (walletId) => {
  return fetch(`${baseURL}/billeteras/${walletId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(response => response.json());
};
