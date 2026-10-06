const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const createId = (prefix) => `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 7)}`

const seed = [
  { id: 't1', name: 'Ali', email: 'ali@demo.com', phone: '0300-0000001', password: '1234', shop: 'Ali Tailors', city: 'Islamabad', about: 'Shalwar kameez and waistcoat specialist', price: 2500 },
  { id: 't2', name: 'Sara', email: 'sara@demo.com', phone: '0300-0000002', password: '1234', shop: 'Sara Boutique', city: 'Lahore', about: 'Ladies suits and bridal wear', price: 3500 },
  { id: 't3', name: 'Usman', email: 'usman@demo.com', phone: '0300-0000003', password: '1234', shop: 'Usman Suits', city: 'Karachi', about: 'Pant coat and sherwani', price: 6000 },
]

export const getTailors = () => {
  let tailors = read('tailors', null)
  if (!tailors) {
    write('tailors', seed)
    tailors = seed
  }
  return tailors
}

export const signup = (data) => {
  const tailors = getTailors()
  if (tailors.some((tailor) =>
    (data.email && tailor.email === data.email) || (data.phone && tailor.phone === data.phone)
  )) {
    throw new Error('An account with that email or phone number already exists.')
  }
  const user = { ...data, id: createId('t') }
  write('tailors', [...tailors, user])
  write('session', user.id)
  return user
}

export const login = (identifier, password) => {
  const user = getTailors().find((tailor) =>
    (tailor.email === identifier || tailor.phone === identifier) && tailor.password === password
  )
  if (!user) throw new Error('Email, phone number, or password is incorrect.')
  write('session', user.id)
  return user
}

export const logout = () => localStorage.removeItem('session')
export const currentUser = () => getTailors().find((tailor) => tailor.id === read('session', null)) || null

export const getCustomers = (tailorId) =>
  read('customers', []).filter((customer) => customer.tailorId === tailorId)

export const getCustomer = (customerId) =>
  read('customers', []).find((customer) => customer.id === customerId) || null

export const addCustomer = (tailorId, data) => {
  const customers = read('customers', [])
  const customer = { ...data, id: createId('c'), tailorId, createdAt: new Date().toISOString(), measurements: [] }
  write('customers', [customer, ...customers])
  return customer
}

export const updateCustomer = (customerId, patch) => {
  const customers = read('customers', []).map((customer) =>
    customer.id === customerId ? { ...customer, ...patch } : customer
  )
  write('customers', customers)
}

export const deleteCustomer = (customerId) => {
  write('customers', read('customers', []).filter((customer) => customer.id !== customerId))
}

export const saveMeasurements = (customerId, data) => {
  const customers = read('customers', [])
  const customer = customers.find((entry) => entry.id === customerId)
  if (!customer) throw new Error('Customer could not be found.')
  const record = { ...data, id: createId('m'), savedAt: new Date().toISOString() }
  write('customers', customers.map((entry) =>
    entry.id === customerId
      ? { ...entry, measurements: [record, ...(entry.measurements || [])] }
      : entry
  ))
  return record
}

export const getOrders = (tailorId) =>
  read('orders', []).filter((order) => order.tailorId === tailorId || order.shopId === tailorId)

export const createOrder = (tailorId, data) => {
  const orders = read('orders', [])
  const order = {
    ...data,
    id: createId('o'),
    orderNumber: `#${String(orders.filter((entry) => entry.tailorId === tailorId || entry.shopId === tailorId).length + 1).padStart(3, '0')}`,
    tailorId,
    status: 'New',
    createdAt: new Date().toISOString(),
  }
  write('orders', [order, ...orders])
  return order
}

export const updateOrder = (orderId, patch) => {
  write('orders', read('orders', []).map((order) =>
    order.id === orderId ? { ...order, ...patch } : order
  ))
}

export const updateTailor = (tailorId, patch) => {
  write('tailors', getTailors().map((tailor) =>
    tailor.id === tailorId ? { ...tailor, ...patch } : tailor
  ))
}
