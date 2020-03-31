defmodule GringottsPaymentWeb.CamsController do
  use GringottsPaymentWeb, :controller
  alias Gringotts, as: Billing
  alias Gringotts.Response
  alias Gringotts.CreditCard
  alias Gringotts.Gateways.Cams

  
  @currency "USD"
  def index(conn, _params) do
    render conn, "index.html"
  end

  def purchase(conn, data) do
    amount = :rand.uniform(1000)  
    params = to_keyword_list(data)
    payment = buildCard(params)
    options = buildOptions(params)
    {:ok, %Response{message: result,success: success, authorization: transaction_id}} = Billing.purchase(Cams, amount, payment, options)
    render conn,"purchase.json", message: result , success: success , authorization: transaction_id
  end

  def to_keyword_list(data) do
    Enum.map(data, fn({key, value}) -> {String.to_atom(key), value} end)
  end
  
  def buildCard(params) do
    %CreditCard{ 
      number: params[:number],
      month: String.to_integer(params[:month]),
      year: params[:year],
      verification_code: params[:verification_code],
      first_name: params[:first_name],
      last_name: params[:last_name]
    }
  end

  def buildOptions(params) do
    address = %{
      name: Enum.join([params[:first_name], params[:last_name]]),
      address1: params[:address],
      city: params[:city],
      state: params[:state],
      zip: params[:zip],
      phone: params[:phone],
      email: params[:email]
    }
    [billing_address: address,currency: @currency]
  end
    
end