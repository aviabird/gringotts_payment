defmodule GringottsPaymentWeb.Router do
  use GringottsPaymentWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    # plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", GringottsPaymentWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    
    get "/cams", CamsController, :index
  end

  scope "/api", GringottsPaymentWeb do
    pipe_through :api # Use the default browser stack

    post "/purchase", PageController, :purchase
    options "/purchase", PageController, :options
    
    post "/cams/purchase", CamsController, :purchase    
  end


  # Other scopes may use custom stacks.
  # scope "/api", GringottsPaymentWeb do
  #   pipe_through :api
  # end
end
