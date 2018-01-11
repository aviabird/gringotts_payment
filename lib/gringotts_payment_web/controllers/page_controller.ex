defmodule GringottsPaymentWeb.PageController do
  use GringottsPaymentWeb, :controller
  alias Gringotts, as: Billing
  alias Gringotts.Gateways.Stripe

  @options [currency: "usd"]

  def index(conn, _params) do
    render conn, "index.html"
  end

  def purchase(conn, %{"id" => id }) do
    value = Billing.purchase(Stripe, 5, id, @options)
    cond do
      value["created"] ->
        render conn, "purchase.json", success: value
      value["error"] -> 
        render conn, "purchase.json", error: value
    end
  end
end
