defmodule GringottsPaymentWeb.CamsController do
  use GringottsPaymentWeb, :controller
  alias Gringotts, as: Billing
  alias Gringotts.Response
  alias Gringotts.Gateways.Cams
  
  @options [currency: "USD"]
  @amount 100

  def index(conn, _params) do
    render conn, "index.html"
  end

  def purchase(conn, card) do
    {:ok, %Response{success: result}} = Billing.purchase(Cams, @amount, card, @options)
  end
  
    
end