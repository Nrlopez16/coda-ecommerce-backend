export function storeCurrentToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

export function storeCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

export function storeCurrentId(id) {
    localStorage.setItem('id', JSON.stringify(id));
  }
  
export function storeCurrentCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
   
export function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }
 
export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  
export function getCurrentId() {
    const id = JSON.parse(localStorage.getItem('id'));
    return id;
  }
    
export function getCurrentCart() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart;
}
   
export function clearCurrentToken() {
    localStorage.removeItem('token');
  }

export function clearCurrentUser() {
    localStorage.removeItem('user');
  }
 
export function clearCurrentId() {
    localStorage.removeItem('id');
  }

export function clearCurrentCart() {
    localStorage.removeItem('cart');
  }
   