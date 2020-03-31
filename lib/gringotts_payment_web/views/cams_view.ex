defmodule GringottsPaymentWeb.CamsView do
  use GringottsPaymentWeb, :view

  def render("purchase.json", %{message: result, success: success, authorization: transaction_id}) do
    %{
      message: result,
      success: success,
      authorization: transaction_id
    }
  
  end
end