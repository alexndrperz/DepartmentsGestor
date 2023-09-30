import secrets, random, string,os
from django.http import HttpResponse
from openpyxl import load_workbook

class Services:
    def crear_token():
        token = secrets.token_urlsafe(32)
        token = f"{token}"
        return token
    
    def generate_code(length=6):
        letters = string.ascii_uppercase + string.ascii_lowercase + string.digits
        return ''.join(random.choice(letters) for _ in range(length))
    

    def generate_xlsx(data):
        print(os.path.abspath('dat_pl.xlsx'))
        workbook = load_workbook(os.path.abspath('dat_pl.xlsx'))
        worksheet = workbook['Hoja1']
        print(data)
        for row, item in enumerate(data, start=2):
            worksheet.cell(row=row, column=1, value=item['id'])
            worksheet.cell(row=row, column=2, value=item['department']['name'])
            worksheet.cell(row=row, column=2, value=item['producto']['name'])
            worksheet.cell(row=row, column=2, value=item['createdAt'])
            worksheet.cell(row=row, column=2, value=item['status'])
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="archivo.xlsx"'
        workbook.save(response)
        return response