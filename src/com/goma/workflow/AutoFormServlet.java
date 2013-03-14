package com.goma.workflow;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AutoFormServlet
 */
public class AutoFormServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AutoFormServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map<String,String> templete = null;
		String realPath = request.getSession().getServletContext().getRealPath("/WorkFlow");
//		String name = request.getParameter("name");
		String html = request.getParameter("html");
		String fileName = UUID.randomUUID().toString() + ".jsp";
		try {
			templete = this.readTemplete(realPath + "\\templete\\base.templete");
			this.createFormFile(realPath + "\\forms\\" + fileName, templete.get("TempleteHeader") + html + templete.get("TempleteFooterer"));
			response.getWriter().write("system create form file is success.");
		} catch (Exception e) {
			response.getWriter().write("system create form file is error.");
		}
	}

	private void createFormFile(String filePath, String fileContext)
			throws IOException {
		System.out.println(filePath);
		File file = new File(filePath);
		if (!file.exists())
			file.createNewFile();
		FileOutputStream out = new FileOutputStream(file, true);
		out.write(fileContext.getBytes("UTF-8"));
		out.close();
	}

	public Map<String, String> readTemplete(String path) throws IOException {
		Map<String, String> templete = new HashMap<String, String>();
		File file = new File(path);
		if (!file.exists() || file.isDirectory())
			throw new FileNotFoundException();
		BufferedReader br = new BufferedReader(new FileReader(file));
		String temp = null;
		StringBuffer sb = new StringBuffer();
		temp = br.readLine();
		while (temp != null) {
			if ("###EndTempleteHeader".equals(temp)) {
				templete.put("TempleteHeader", sb.toString());
				sb.delete(0, sb.length());
			} else if ("###EndTempleteFooter".equals(temp)) {
				templete.put("TempleteFooterer", sb.toString());
			}
			if (!"###EndTempleteHeader".equals(temp)
					&& !"###EndTempleteFooter".equals(temp)) {
				sb.append(temp + " ");
			}
			temp = br.readLine();
		}
		return templete;
	}

}
