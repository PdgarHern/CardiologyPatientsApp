Rails.application.routes.draw do
  resources :patients
  resources :doctors
  default_url_options :host => "localhost:3000"
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
             
end
